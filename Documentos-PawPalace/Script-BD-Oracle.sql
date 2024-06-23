CREATE TABLE "productos_categoria" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "nombre" varchar(200)
);

CREATE TABLE "productos_producto" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "nombre" varchar(50),
  "descripcion" text,
  "imagen" varchar(100),
  "stock" integer,
  "fecha_creacion" datetime,
  "categoria_id" bigint,
  "precio" integer
);

CREATE TABLE "django_migrations" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "app" varchar(255),
  "name" varchar(255),
  "applied" datetime
);

CREATE TABLE "auth_group_permissions" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "group_id" integer,
  "permission_id" integer
);

CREATE TABLE "auth_user_groups" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "user_id" integer,
  "group_id" integer
);

CREATE TABLE "auth_user_user_permissions" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "user_id" integer,
  "permission_id" integer
);

CREATE TABLE "django_admin_log" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "object_id" text,
  "object_repr" varchar(200),
  "action_flag" smallint,
  "change_message" text,
  "content_type_id" integer,
  "user_id" integer,
  "action_time" datetime
);

CREATE TABLE "django_content_type" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "app_label" varchar(100),
  "model" varchar(100)
);

CREATE TABLE "auth_permission" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "content_type_id" integer,
  "codename" varchar(100),
  "name" varchar(255)
);

CREATE TABLE "auth_group" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "name" varchar(150)
);

CREATE TABLE "auth_user" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "password" varchar(128),
  "last_login" datetime,
  "is_superuser" bool,
  "username" varchar(150),
  "last_name" varchar(150),
  "email" varchar(254),
  "is_staff" bool,
  "is_active" bool,
  "date_joined" datetime,
  "first_name" varchar(150)
);

CREATE TABLE "django_session" (
  "session_key" varchar(40) PRIMARY KEY,
  "session_data" text,
  "expire_date" datetime
);

ALTER TABLE "productos_producto" ADD FOREIGN KEY ("categoria_id") REFERENCES "productos_categoria" ("id");

ALTER TABLE "auth_group_permissions" ADD FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id");

ALTER TABLE "auth_group_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id");

ALTER TABLE "auth_user_groups" ADD FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id");

ALTER TABLE "auth_user_groups" ADD FOREIGN KEY ("group_id") REFERENCES "auth_group" ("id");

ALTER TABLE "auth_user_user_permissions" ADD FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id");

ALTER TABLE "auth_user_user_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "auth_permission" ("id");

ALTER TABLE "django_admin_log" ADD FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id");

ALTER TABLE "django_admin_log" ADD FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id");

ALTER TABLE "auth_permission" ADD FOREIGN KEY ("content_type_id") REFERENCES "django_content_type" ("id");
