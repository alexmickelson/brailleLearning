from pprint import pprint
from psycopg_pool import AsyncConnectionPool
from psycopg.rows import class_row
import os


async def run_sql(sql, params, output_class=None):
    db_user = os.environ["POSTGRES_USER"]
    db_password = os.environ["POSTGRES_PASSWORD"]
    db_name = os.environ["POSTGRES_DB"]
    db_host = os.environ["POSTGRES_HOST"]

    pool = AsyncConnectionPool(
        conninfo=f"dbname={db_name} user={db_user} password={db_password} host={db_host}"
    )
    await pool.open()
    async with pool.connection() as conn:
        async with conn.cursor(
            row_factory=class_row(output_class)
        ) if output_class else conn.cursor() as cur:
            res = await cur.execute(sql, params)
            await conn.commit()
            return await cur.fetchall() if res.description else None


def get_run_sql():
    return run_sql
