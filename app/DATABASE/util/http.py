import urllib
import urllib2
import json
from util.debug import d
from util.log import c_log as log
from util.tools import env, empty, g

host = "localhost"
port = g(env('KENWEB_PORT', is_optional=True), "3001")     # export WMN_PORT=8888 # for dev env


def _request_post(url, params):

    data = urllib.urlencode(params)
    req = urllib2.Request(url, data)
    response = urllib2.urlopen(req)
    res = response.read()
    return res


def request(end_point, params, is_post=False, is_test=True):
    url = "http://{0}:{1}/".format(host,port) + end_point

    if is_test and empty(env('WMN_NOT_DEV_TEST_DB', is_optional=True)):  # make sure WMN_NOT_DEV_TEST_DB is not set as well
        # navigate to the Dev-test
        params['isTest'] = 'true'

    if not is_post:
        url += "?"
        for k in params:
            url += k + "=" + params[k] + "&"
        response = urllib.urlopen(url).read()
        log.debug("url requested: " + url)
        try:
            return json.loads(response)
        except ValueError as e:
            raise Exception(response)
    else:
        return _request_post(url, params)


def not_empty(response):
    return not empty(response)


def empty(response):
    return not response
