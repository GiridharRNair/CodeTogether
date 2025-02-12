class Solution(object):
    def dayOfYear(self, date):
        from datetime import datetime

        dt = datetime.strptime(date, "%Y-%m-%d")
        return dt.timetuple().tm_yday