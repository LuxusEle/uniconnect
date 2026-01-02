import subprocess

def run_git(command):
    print(f"--- {command} ---")
    try:
        # shell=True is needed for some environments, but list args are safer. 
        # Using string for shell=True
        result = subprocess.run(command, capture_output=True, text=True, shell=True)
        print("STDOUT:\n", result.stdout)
        print("STDERR:\n", result.stderr)
        return result.stdout, result.stderr
    except Exception as e:
        print(f"Error: {e}")
        return "", str(e)

with open("git_debug_py.log", "w") as f:
    def log(msg):
        print(msg)
        f.write(msg + "\n")

    cmd = "git status"
    out, err = run_git(cmd)
    log(f"CMD: {cmd}\nOUT: {out}\nERR: {err}")

    cmd = "git pull --rebase"
    out, err = run_git(cmd)
    log(f"CMD: {cmd}\nOUT: {out}\nERR: {err}")

    cmd = "git push"
    out, err = run_git(cmd)
    log(f"CMD: {cmd}\nOUT: {out}\nERR: {err}")
