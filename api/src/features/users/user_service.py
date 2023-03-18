from cachetools import LRUCache, cached
from cachetools.keys import hashkey
from fastapi import Depends
from src.models.user import User, UserProfile
from src.services.db_service import RunSql

users_cache: LRUCache = LRUCache(maxsize=100)


class UserService:
    def __init__(self, run_sql: RunSql = Depends()) -> None:
        self.run_sql = run_sql

    async def make_user_admin(self, sub: str):
        sql = """
            update UserAccount
            set is_admin = true
            where sub = %(sub)s
        """
        params = {"sub": sub}
        await self.run_sql(sql, params)
        users_cache.clear()

    async def get_all_admins(self):
        sql = """
            select * from UserAccount
            where is_admin = true
        """
        return await self.run_sql(sql, {}, output_class=User)

    async def create_user(self, sub: str, name: str):
        sql = """
            INSERT INTO UserAccount
                (sub, name)
            values
                (%(sub)s, %(name)s)
        """
        params = {"name": name, "sub": sub}
        await self.run_sql(sql, params)
        users_cache.clear()

    @cached(cache=users_cache, key=lambda _self, sub: hashkey(sub))
    async def get_profile(self, sub: str):
        sql = """
            select 
                sub,
                name,
                is_admin
            from UserAccount
            where sub = %(sub)s
        """
        params = {"sub": sub}
        users = await self.run_sql(sql, params, output_class=UserProfile)
        return users[0]
