# -*- coding: utf-8 -*-
from chatterbot import ChatBot
import logging

# Comment out the following line to disable verbose logging
logging.basicConfig(level=logging.INFO)

chatbot = ChatBot("TwitterBot",
                  logic_adapters=[
                      "chatterbot.logic.BestMatch"
                  ],
                  input_adapter="chatterbot.input.TerminalAdapter",
                  output_adapter="chatterbot.output.TerminalAdapter",
                  database="./twitter-database.db",
                  twitter_consumer_key="",
                  twitter_consumer_secret="",
                  twitter_access_token_key="",
                  twitter_access_token_secret="",
                  trainer="chatterbot.trainers.TwitterTrainer"
                  )

chatbot.train()

chatbot.logger.info('Trained database generated successfully!')
