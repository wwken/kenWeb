#!/usr/bin/python


from os import listdir
from os.path import isfile, join
from util.tools import env, get_file_name_without_extension
from util.http import request, empty
from util.log import c_log as log
from util.debug import d
from settings.endpoints import SELECT_END_POINT, INSERT_END_POINT

dirpath = env("KENWEB_IMPORT_DIR")
specifiedFile = env("KENWEB_IMPORT_FILE", True)  # optional

onlyfiles = [f for f in listdir(dirpath) if isfile(join(dirpath, f))]

# This is the resourceId in UserResource Table.
# 1 means profile avatar
resource_id = 1

for f in onlyfiles:
    if f.startswith('.'):   # ignore everything start with '.'
        continue

    p = {
        'id': get_file_name_without_extension(f),
        'resourceId': str(resource_id)
    }

    response = request(SELECT_END_POINT, p)     # issue http call

    if empty(response):
        # Insert it to database since it does not exist before
        p['localPath'] = dirpath
        p['fileName'] = f
        response = request(INSERT_END_POINT, p)     # issue http call
        log.info(response)
    else:
        log.info('skipping ' + f)


