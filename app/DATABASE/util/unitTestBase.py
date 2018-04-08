import unittest
from util.tools import is_pd_series


class UnitTestBase(unittest.TestCase):

    def _init_d(self, l):
        d = {}
        if ((is_pd_series(l) and not l.empty) or not l) and l is not None:
            for a in l:
                d[a] = True
        return d

    def assertContain(self, lst_actual, lst_expected):
        d = self._init_d(lst_actual)
        if not lst_expected or lst_expected is None:
            if d:
                raise Exception('actual outcomes are not empty!')
            else:
                return
        for e in lst_expected:
            if e not in d:
                raise Exception('{0} is not found in the {1}!'.format(e, lst_actual))

    def assertNotContain(self, lst_actual, lst_expected):
        d = self._init_d(lst_actual)
        for e in lst_expected:
            if e in d:
                raise Exception('{0} is found in the {1}!'.format(e, lst_actual))

    # Row is zero based
    def assertValueAtNthRow(self, rows, nth, expected_value):
        if rows[nth] != expected_value:
            raise Exception('Row at {0}th - {1} is not equal to {2}!'.format(nth, rows[nth], expected_value))
