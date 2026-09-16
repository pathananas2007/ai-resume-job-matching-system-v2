import os
import subprocess
import sys
import re


def preformat_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original_content = content

    # 1. Indented squashes (4+ spaces)
    content = re.sub(r"([^\s])(\s{4,}[a-zA-Z@_\"\'#])", r"\1\n\2", content)

    # 2. Root level squashes (no indentation)
    content = re.sub(
        r"(?<=[a-zA-Z0-9_\)\"\'\]\}])(from |import |class |def |async def |@)",
        r"\n\1",
        content,
    )

    # 3. Special cases observed
    content = re.sub(
        r"(?<=[a-zA-Z0-9_\)\"\'\]\}])(return |if |await |assert |print\()",
        r"\n\1",
        content,
    )
    # Revert `not\nif` in case it happened
    content = content.replace("not\nif", "notif")
    content = content.replace("not\nif ", "notif ")

    # 4. Custom squash fixes based on errors
    content = content.replace("router = APIRouter()", "\nrouter = APIRouter()\n")
    content = content.replace(
        "logger = logging.getLogger(__name__)",
        "\nlogger = logging.getLogger(__name__)\n",
    )
    content = content.replace(
        "pytestmark = pytest.mark.asyncio", "\npytestmark = pytest.mark.asyncio\n"
    )
    content = content.replace(
        "client = TestClient(app)", "\nclient = TestClient(app)\n"
    )
    content = content.replace("CACHE_MAX_SIZE = 100", "\nCACHE_MAX_SIZE = 100\n")
    content = content.replace(
        "CACHE_TTL_SECONDS = 3600", "\nCACHE_TTL_SECONDS = 3600\n"
    )
    content = content.replace("ALLOWED_MIME_TYPES = {", "\nALLOWED_MIME_TYPES = {\n")
    content = content.replace(
        '_ANALYSIS_SYSTEM_PROMPT = """', '\n_ANALYSIS_SYSTEM_PROMPT = """\n'
    )
    content = content.replace(
        'schema_dir = "app/schemas"', '\nschema_dir = "app/schemas"\n'
    )
    content = content.replace(
        "os.makedirs(schema_dir, exist_ok=True)",
        "\nos.makedirs(schema_dir, exist_ok=True)\n",
    )
    content = content.replace("files = [", "\nfiles = [\n")
    content = content.replace("for f in files:", "\nfor f in files:\n")
    content = content.replace("response = client.get", "\nresponse = client.get")
    content = content.replace("genai.configure(", "\ngenai.configure(")
    content = content.replace("doc = {", "\ndoc = {")
    content = content.replace("def __init__(self)", "\ndef __init__(self)")
    content = content.replace("@classmethod", "\n@classmethod")

    # Comments squashed
    content = re.sub(r"(?<=[a-zA-Z0-9_\)\"\'\]\}])(# )", r"\n\1", content)

    if content != original_content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False


def main():
    print("Pre-formatting files to fix squashed lines...")
    count = 0
    directory = os.path.dirname(os.path.abspath(__file__))
    for root, _, files in os.walk(directory):
        if "venv" in root or "__pycache__" in root:
            continue
        for file in files:
            if file.endswith(".py") and file != "fix_formatting.py":
                filepath = os.path.join(root, file)
                if preformat_file(filepath):
                    count += 1
    print(f"Pre-formatted {count} files.")

    print(f"Formatting python files in {directory} using black...")
    try:
        subprocess.check_call([sys.executable, "-m", "black", directory])
        print("Formatting complete! ✅")
    except subprocess.CalledProcessError as e:
        print(
            f"Black formatting failed with exit code {e.returncode}. Some files may still have syntax errors."
        )


if __name__ == "__main__":
    main()
