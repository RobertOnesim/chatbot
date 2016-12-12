import aiml
import os


kernel = aiml.Kernel()

"""kernel.learn("std-startup.xml")
kernel.respond("load aiml b")"""

for (root, directories, files) in os.walk("../../Module-II/aiml"):
    for file_name in files:
        full_path = os.path.join(root, file_name)
        if os.path.splitext(full_path)[1] == ".aiml":
            kernel.learn(full_path)

sessionID = 12345

# kernel now ready for use
while True:
    print kernel.respond(raw_input("Enter your message >> "))
    kernel.setPredicate("dog", kernel.getPredicate("dog"), sessionID)
