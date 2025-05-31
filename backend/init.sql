create table config (
    id integer primary key autoincrement,
    title string not null default "",
    description string not null default "",
    secret string not null default ""
);

create table samba_routes (
    id integer primary key autoincrement,
    name string not null default "",
    description string not null default "",
    service_name string not null default "",
    share_name string not null default "",
    user_id string not null default "",
    password string not null default "",
    use_ntlm_v2 bool not null default 1,
    is_direct_tcp bool not null default 1
);