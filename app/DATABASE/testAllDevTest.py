#!/usr/bin/python
import unittest
from test.userLocation_testcase import UserLocationTestCase
from test.userResource_testcase import UserResourceTestCase
from test.userNotification_testcase import UserNotificationTestCase
from util.tools import process_arguments

# Any unit-test should be run after all fixture data are injected into the DB first
'''
This script is to unit-test all DB fixture data:
Steps to use this:

1a)
    ./testAllDev.py      # for running all unit-tests
or

1b)
    ./testAllDev.py -i UserResourceTestCase         # for running only the UserResourceTestCase testsuite
    ./testAllDev.py -i UserLocationTestCase         # for running only the UserLocationTestCase testsuite
    ./testAllDev.py -i UserNotificationTestCase     # for running only the UserNotificationTestCase testsuite

'''

# Process the program arguments
include_test_classes, exclude_test_classes = process_arguments()

test_suite = unittest.TestSuite()


def should_init_this(test_class_name):
    if not include_test_classes:
        return True
    for t_c in include_test_classes:
        if t_c in test_class_name:
            return True
    return False


def load(test_class):
    if should_init_this(str(test_class)):
        test_suite.addTest(unittest.makeSuite(test_class))


def suite():
    """
        Gather all the tests from this module in a test suite.
    """
    load(UserLocationTestCase)
    load(UserResourceTestCase)
    load(UserNotificationTestCase)

    return test_suite

mySuit=suite()
runner=unittest.TextTestRunner()
runner.run(mySuit)