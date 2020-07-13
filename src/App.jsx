import React from "react";
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  Create,
  SimpleForm,
  ReferenceInput,
  TextInput,
  SelectInput,
} from "react-admin";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="users" list={ListGuesser} edit={EditGuesser} />
      <Resource name="posts" list={ListGuesser} edit={EditGuesser} create={createPost} />
    </Admin>
  );
}

function createPost(props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="username" reference="users">
          <SelectInput optionText="username" />
        </ReferenceInput>
        <TextInput source="image" />
        <TextInput multiline source="desc" />
      </SimpleForm>
    </Create>
  );
}

export default App;
