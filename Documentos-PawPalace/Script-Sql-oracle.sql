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

CREATE TABLE "admin_interface_theme" (
  "id" integer GENERATED AS IDENTITY PRIMARY KEY,
  "name" varchar(50),
  "active" bool,
  "title" varchar(50),
  "title_visible" bool,
  "logo" varchar(100),
  "logo_visible" bool,
  "css_header_background_color" varchar(10),
  "css_header_text_color" varchar(10),
  "css_header_link_color" varchar(10),
  "css_header_link_hover_color" varchar(10),
  "css_module_background_color" varchar(10),
  "css_module_text_color" varchar(10),
  "css_module_link_color" varchar(10),
  "css_module_link_hover_color" varchar(10),
  "css_module_rounded_corners" bool,
  "css_generic_link_color" varchar(10),
  "css_generic_link_hover_color" varchar(10),
  "css_save_button_background_color" varchar(10),
  "css_save_button_background_hover_color" varchar(10),
  "css_save_button_text_color" varchar(10),
  "css_delete_button_background_color" varchar(10),
  "css_delete_button_background_hover_color" varchar(10),
  "css_delete_button_text_color" varchar(10),
  "list_filter_dropdown" bool,
  "related_modal_active" bool,
  "related_modal_background_color" varchar(10),
  "related_modal_rounded_corners" bool,
  "logo_color" varchar(10),
  "title_color" varchar(10),
  "recent_actions_visible" bool,
  "favicon" varchar(100),
  "related_modal_background_opacity" varchar(5),
  "env_name" varchar(50),
  "env_color" varchar(10),
  "env_visible_in_header" bool,
  "env_visible_in_favicon" bool,
  "related_modal_close_button_visible" bool,
  "language_chooser_active" bool,
  "language_chooser_display" varchar(10),
  "list_filter_sticky" bool,
  "form_pagination_sticky" bool,
  "form_submit_sticky" bool,
  "css_module_background_selected_color" varchar(10),
  "css_module_link_selected_color" varchar(10),
  "logo_max_height" smallint,
  "logo_max_width" smallint,
  "foldable_apps" bool,
  "language_chooser_control" varchar(20),
  "list_filter_highlight" bool,
  "list_filter_removal_links" bool,
  "show_fieldsets_as_tabs" bool,
  "show_inlines_as_tabs" bool,
  "css_generic_link_active_color" varchar(10),
  "collapsible_stacked_inlines" bool,
  "collapsible_stacked_inlines_collapsed" bool,
  "collapsible_tabular_inlines" bool,
  "collapsible_tabular_inlines_collapsed" bool
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
