import Form from "../../../components/form";
import { FormProps } from "../types/accessType";

const SignInForm: React.FC<FormProps> = ({ email, setEmail, password, setPassword }) => (
    <Form
      title="Sign In"
      description="Please enter your details to sign in."
      inputs={[
        {
          placeholder: "Email",
          value: email,
          onChangeText: setEmail,
          autoFocus: true,
        },
        {
          placeholder: "Password",
          value: password,
          onChangeText: setPassword,
          secureTextEntry: true,
        },
      ]}
      containerStyle={{ width: "80%" }}
    />
  );

  export default SignInForm;
