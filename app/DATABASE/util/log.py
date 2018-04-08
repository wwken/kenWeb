__author__ = 'Ken Wu'

import logging
from logging.config import dictConfig

from settings.settings import LOGGER_NAME, LOG_CONFIG

dictConfig(LOG_CONFIG)
c_log = logging.getLogger(LOGGER_NAME)
