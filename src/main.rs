
#![feature(plugin, decl_macro)]
#![plugin(rocket_codegen)]

extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;

#[cfg(test)] mod tests;

use rocket_contrib::{Json, Value};

type ID = usize;

#[derive(Serialize, Deserialize)]
struct MattemostSlashcommandRequest {
    id: Option<ID>,
    channel_id: String,
    channel_name: String,
    command:String,
    response_url:String,
    team_domain:String,
    team_id:String,
    text:String,
    token:String,
    user_id:String,
    user_name:String
}

#[get("/shrug")]
fn shrug() -> Json<Value> {
    Json(json!({
        "response_type": "in_channel",
        "text": format!("{} ¯\\_(ツ)_/¯", "message")
    }))
}
#[error(404)]
fn not_found() -> Json<Value> {
    Json(json!({
        "status": "error",
        "reason": "Resource was not found."
    }))
}

fn rocket() -> rocket::Rocket {
    rocket::ignite()
        .mount("/api", routes![shrug])
        .catch(errors![not_found])
}

fn main() {
    rocket().launch();
}
     