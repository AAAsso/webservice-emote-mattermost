
#![feature(plugin, decl_macro)]
#![plugin(rocket_codegen)]

extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;

#[cfg(test)] mod tests;

use rocket_contrib::{Json, Value};
use rocket::State;
use std::collections::HashMap;
use std::sync::Mutex;

type ID = usize;

#[derive(Serialize, Deserialize)]
struct MattemostSlashcommandRequest {
    id: Option<ID>,
    response_type: String,
    text: String
}

#[get("/shrug")]
fn shrug() -> Json<Value> {
    Json(json!({
        "response_type": "in_channel",
        "text": format!("{} ¯\\_(ツ)_/¯", "message")
    }))
}

fn main() {
	rocket::ignite().mount("/api", routes![shrug]).launch();
}