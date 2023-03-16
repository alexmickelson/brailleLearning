from fastapi import Depends
from src.models.user import User
from src.services.db_service import RunSql


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
