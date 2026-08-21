import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const COLORS = {
  api: "\x1b[36m", // cyan
  web: "\x1b[32m", // green
  reset: "\x1b[0m",
};

const tasks = [
  {
    name: "api",
    cmd: process.execPath,
    args: ["--watch", "--env-file-if-exists=.env", "server/server.js"],
  },
  {
    name: "web",
    cmd: process.execPath,
    args: [path.join(root, "node_modules", "vite", "bin", "vite.js"), "dev"],
  },
];

const children = tasks.map((task) => {
  const child = spawn(task.cmd, task.args, { cwd: root, stdio: ["inherit", "pipe", "pipe"] });

  child.stdout.on("data", (chunk) => {
    for (const line of String(chunk).split("\n")) {
      if (line.trim()) console.log(`${COLORS[task.name]}[${task.name}]${COLORS.reset} ${line}`);
    }
  });
  child.stderr.on("data", (chunk) => {
    for (const line of String(chunk).split("\n")) {
      if (line.trim()) console.error(`${COLORS[task.name]}[${task.name}]${COLORS.reset} ${line}`);
    }
  });

  child.on("exit", (code) => {
    console.log(`[${task.name}] exited with code ${code}`);
    for (const other of children) {
      if (other !== child && other.exitCode === null) other.kill();
    }
  });

  return child;
});

process.on("SIGINT", () => {
  for (const child of children) child.kill();
  process.exit(0);
});
