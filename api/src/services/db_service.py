from pprint import pprint
from typing import Any, Callable, Dict, List, Optional, Type, TypeVar
from psycopg_pool import AsyncConnectionPool
from psycopg.rows import class_row
from pydantic import BaseModel
import os

T = TypeVar("T", bound=BaseModel)

pool: AsyncConnectionPool | None = None


class RunSql:
    async def __call__(
        self, sql: str, params: Dict[str, Any], output_class: Optional[Type[T]] = None
    ):
        global pool

        if not pool:
            db_user = os.environ["POSTGRES_USER"]
            db_password = os.environ["POSTGRES_PASSWORD"]
            db_name = os.environ["POSTGRES_DB"]
            db_host = os.environ["POSTGRES_HOST"]

            pool = AsyncConnectionPool(
                conninfo=f"dbname={db_name} user={db_user} password={db_password} host={db_host}"
            )
            await pool.open()

        try:
            async with pool.connection() as conn:
                async with conn.cursor(
                    row_factory=class_row(output_class)
                ) if output_class else conn.cursor() as cur:
                    res = await cur.execute(sql, params)  # type: ignore
                    await conn.commit()
                    return await cur.fetchall() if res.description else []
        except Exception as e:
            print(sql)
            print(params)
            raise e