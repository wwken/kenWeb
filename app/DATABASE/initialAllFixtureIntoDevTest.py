#!/usr/bin/python

from web.User import populate_fixture_user
from web.resource import populate_fixture_resource
from web.UserResource import populate_fixture_user_resource
from web.UserLocation import populate_fixture_user_location
from web.UserRelation import populate_fixture_user_relation
from web.Relation import populate_fixture_relation
from web.Notification import populate_fixture_notification
from web.UserNotification import populate_fixture_user_notification
from util.tools import get_resources_profile_avator_dir, process_arguments
from util.log import c_log as log

'''
Remember to run this on database before:
    ./bash_scripts/truncateAllTablesInDev.sh        # for dev database
    ./bash_scripts/truncateAllTablesInDevTest.sh    # for dev-test database

This script is to initialize all fixture data into the Dev and Dev-test database for all test/unit-tests accros all platforms

Steps to use this:

1) Make sure to truncate all tables in the test database (commands listed in above)
2a) ./initialAllFixtureIntoDevTest.py                   # for initializing everything
    or
2b) ./initialAllFixtureIntoDevTest.py -i User           # for only initializing User table

'''

__author__ = 'Ken Wu'

# Process the program arguments
include_tables, exclude_tables = process_arguments()

total_user_loaded = 0


def should_init_table(table_name):
    return not include_tables or table_name in include_tables


def add_user(first_name, last_name, sex, birthday):
    global total_user_loaded
    populate_fixture_user(first_name, last_name, sex, birthday)
    total_user_loaded += 1

# This for User table fixture data
if should_init_table('User'):
    add_user('Ken', 'Wu', '0', '1981-09-26')               # User_id: 1
    add_user('Geoffrery', 'Cheng', '0', '1980-12-11')      # User_id: 2
    add_user('David', 'Cheng', '0', '1982-05-29')          # User_id: 3
    add_user('Eric', 'Li', '0', '1983-07-11')              # User_id: 4
    add_user('Jeanne', 'Wu', '1', '1983-03-31')            # User_id: 5
    add_user('Kylie', 'Kwok', '1', '1989-12-31')           # User_id: 6
    add_user('Eileen', 'Wang', '1', '1988-02-17')          # User_id: 7
    add_user('Yuri', 'Hirano', '1', '')                    # User_id: 8
    add_user('No', 'Gender', '', '')                       # User_id: 9
    add_user('Ming Man', 'Cheung', '1', '1992-12-12')      # User_id: 10
    add_user('Wayne', 'Zhou', '1', '1985-01-05')           # User_id: 11
    add_user('Stephanie', 'Wong', '0', '1984-10-30')       # User_id: 12
    add_user('Janelle', 'LaLala', '0', '')                 # User_id: 13
    add_user('Yvonne', 'Chen', '1', '')                    # User_id: 14
    add_user('beanryu', '', '0', '')                       # User_id: 15
    add_user('Thomas', 'Cheung', '0', '')                  # User_id: 16
    add_user('Jack', 'Zheng ', '0', '')                    # User_id: 17 - No profile pic
    add_user('Mia', 'Lian ', '1', '')                      # User_id: 18

    # # This is for UserResource Table for profile_avatar
    # profile_avatar_dir = get_resources_profile_avator_dir()
    # resource_id = '1'   # 1 for profile_avatar
    # log.info("Importing all resources from this folder: {0}".format(profile_avatar_dir))
    #
    # for x in range(1, total_user_loaded + 1):
    #     populate_fixture_user_resource(str(x), resource_id, profile_avatar_dir, str(x) + '.jpg')