import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1739566050834 implements MigrationInterface {
    name = 'CreateTables1739566050834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "username" character varying,
                "name" character varying,
                "role" character varying(30) NOT NULL DEFAULT 'STANDARD',
                "language" character varying(15) NOT NULL DEFAULT 'en-US',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."tasks_priority_enum" AS ENUM('Low', 'Medium', 'High')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."tasks_status_enum" AS ENUM('To Do', 'In Progress', 'Done')
        `);
        await queryRunner.query(`
            CREATE TABLE "tasks" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "priority" "public"."tasks_priority_enum" NOT NULL DEFAULT 'Low',
                "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'To Do',
                "due_to" TIMESTAMP NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer,
                CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "taskhistories" (
                "id" SERIAL NOT NULL,
                "change_type" character varying NOT NULL,
                "previous_value" json,
                "new_value" json,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "task_id" integer,
                CONSTRAINT "PK_5271376a20ce6a25cc61fc053d4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "taskhistories"
            ADD CONSTRAINT "FK_524097baacc95157e80f42c88e0" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "taskhistories" DROP CONSTRAINT "FK_524097baacc95157e80f42c88e0"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b"
        `);
        await queryRunner.query(`
            DROP TABLE "taskhistories"
        `);
        await queryRunner.query(`
            DROP TABLE "tasks"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."tasks_status_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."tasks_priority_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
