#!/usr/bin/python

from util.tools import env_set

env_set('WMN_NOT_DEV_TEST_DB', 'true')

execfile("./initialAllFixtureIntoDevTest.py")

env_set('WMN_NOT_DEV_TEST_DB', '')

