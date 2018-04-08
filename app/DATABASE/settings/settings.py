import os
import logging

LOGGER_NAME = 'WeMeetNow_Restful_Automator'
LOG_FORMATTER = os.environ.get('WMN_LOG_FORMAT', 'detailed')
LOG_LEVEL = os.environ.get('WMN_LOG_LEVEL', 'INFO')
LOG_FILE = os.environ.get('WMN_LOG_FILE')
ERROR_LOG_FILE = os.environ.get('WMN_ERROR_LOG_FILE')

LOG_CONFIG = {
    "version": 1,
    'disable_existing_loggers': True,
    'formatters': {
        'detailed': {
            'format': "[%(asctime)s] %(levelname)s [%(filename)s->%(funcName)s:%(lineno)s] %(message)s",
            'datefmt': "%Y-%m-%d %H:%M:%S %z"
        },
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'std_out': {
            'level': LOG_LEVEL,
            'class': 'logging.StreamHandler',
            'formatter': LOG_FORMATTER,
            'stream': 'ext://sys.stdout'
        },
    },
    'loggers': {
        LOGGER_NAME: {
            'handlers': ["std_out"],
            'level': LOG_LEVEL,
            'propagate': 'False',
        },
    }
}

if LOG_FILE:
    LOG_CONFIG['handlers']['file'] = {
        'level': LOG_LEVEL,
        'formatter': LOG_FORMATTER,
        'filename': LOG_FILE,
        'when': 'midnight',
        'backupCount': 20,
        'class': 'logging.handlers.TimedRotatingFileHandler',
    }
    LOG_CONFIG['loggers']['platform_communique']['handlers'].append('file')

if ERROR_LOG_FILE:
    LOG_CONFIG['handlers']['error_file'] = {
        'level': logging.WARNING,
        'formatter': LOG_FORMATTER,
        'filename': ERROR_LOG_FILE,
        'when': 'midnight',
        'backupCount': 20,
        'class': 'logging.handlers.TimedRotatingFileHandler',
    }
    LOG_CONFIG['loggers']['platform_communique']['handlers'].append('error_file')
