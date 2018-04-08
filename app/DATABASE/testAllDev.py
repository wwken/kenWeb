#!/usr/bin/python

from util.tools import env_set

env_set('KENWEB_NOT_DEV_TEST_DB', 'true')

execfile("./testAllDevTest.py")

env_set('KENWEB_NOT_DEV_TEST_DB', '')

