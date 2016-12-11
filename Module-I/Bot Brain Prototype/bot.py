import aiml
import os


kernel = aiml.Kernel()

kernel.learn("std-startup.xml")
kernel.respond("load aiml b")

sessionID = 12345

# kernel now ready for use
while True:
    print kernel.respond(raw_input("Enter your message >> "))
    kernel.setPredicate("dog", kernel.getPredicate("dog"), sessionID)
