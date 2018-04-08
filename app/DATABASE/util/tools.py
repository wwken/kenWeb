import os
import sys, getopt
import pandas as pd
import json
from util.log import c_log as log


def g(v, default_v):
    if v is None or len(v) ==0:
        return default_v
    else:
        return v


def env(key, is_optional=False):
    if key not in os.environ:
        if is_optional:
            return None
        else:
            raise Exception('Env key {0} is not specified'.format(key))
    return os.environ[key]


def env_set(key, value):
    os.environ[key] = value


def empty(v):
    return v is None or len(v) == 0


def get_file_name_without_extension(fn):
    return os.path.splitext(fn)[0]


def generate_random_str(n):
    from random import choice
    from string import ascii_uppercase

    return ''.join(choice(ascii_uppercase) for i in range(n))


def combine_path(p1, p2):
    return os.path.join(p1, p2)


def get_resources_dir():
    cur_dir = os.path.dirname(os.path.realpath(__file__))
    resource_dir = combine_path(cur_dir, '../MySql_db_scripts/resources')
    return resource_dir


def get_resources_profile_avator_dir():
    return combine_path(get_resources_dir(), 'profile_avator')


def read_file(fp):
    f = open(fp, 'r+')
    data = f.read()
    f.close()
    return data


def remove_file(fp):
    os.remove(fp);


def write_raw_to_file(raw_str, file_to_be_written):
    with open(file_to_be_written, 'wb') as f:
        f.write(raw_str)


def process_arguments():
    # Store input and output file names
    include_tables=[]
    exclude_tables=[]

    # Read command line args
    myopts, args = getopt.getopt(sys.argv[1:],"i:o:")

    ###############################
    # o == option
    # a == argument passed to the o
    ###############################
    for o, a in myopts:
        if o == '-i':
            include_tables.append(a)
        elif o == '-e':
            exclude_tables.append(a)
        else:
            log.error("Usage: %s -i table_to_be_init -e table_to_be_excluded" % sys.argv[0])
    return include_tables, exclude_tables


def is_list(o):
    return type(o) is list


def is_dict(o):
    return type(o) is dict

# Json/Pandas Utils
#  Example of res object:
#   [
#       {u'distance': 0.24075249033660465, u'message': u'wanna hangout and bang', u'user_id': 2},
#       {u'distance': 1.513075585767007, u'message': u'looking for house?', u'user_id': 3},
#       {u'distance': 2.3272340671371565, u'message': u'sing k?', u'user_id': 8},
#       {u'distance': 4.657185475148594, u'message': u'Staten island is a very boring place!', u'user_id': 4}
#   ]
def is_pd_series(o):
    if type(o) is pd.Series:
        return True
    else:
        return False


def retrieve_from_response(res, key):
    try:
        return pd.DataFrame(res).get(key)
    except Exception as e:
        log.error(e)
    return None


# array_res for example:
#   [{"id":1,"issuer_id":0,"content":"{Ken}","created_time":"2017-02-26T20:49:49.000Z","is_seen":0,"template":"Welcome {0} to WeMeetNow.com!  This platform allows you to meet any people that are interesting to you at the moment!"},{"id":2,"issuer_id":0,"content":"{Ken}{Geo}{1 miles}","created_time":"2017-02-26T20:49:49.000Z","is_seen":0,"template":"Hey {0}, {1} is just {2} next to you!"}]
def retrieve_from_response_in_array(array_res, key, stringify=False):
    try:
        narray = pd.read_json(array_res).get(key)
        raw = narray.values.tolist()
        if stringify:
            return stringify_all_elements_in_list(raw)
        else:
            return raw
    except Exception as e:
        log.error(e)
    return None


def stringify_all_elements_in_list(l):
    return map((lambda x: str(x)), l)


def retrieve_inserted_id(res):
    defined_inserted_id_key = "@pInsertedId"
    r = json.loads(res)
    if is_list(r):
        for e in r:
            if is_list(e):
                for ee in e:
                    if is_dict(ee) and defined_inserted_id_key in ee:
                        return ee[defined_inserted_id_key]
                    else:
                        raise Exception("Cannot find the inserted id from the response")
    raise Exception("Looks like the response is not from the expected format")


def generate_time_str_from_mins_ago(mins_ago):
    from datetime import datetime, timedelta
    minutes_ago_date_time = datetime.today() - timedelta(minutes=mins_ago)
    return minutes_ago_date_time.strftime('%Y-%m-%d %H:%M:%S')