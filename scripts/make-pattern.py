import sys
import os

image_path = sys.argv[1]
output_path = sys.argv[2]

os.system(f"npx @ar-js-org/pattern-marker -i {image_path} -o {output_path}")
