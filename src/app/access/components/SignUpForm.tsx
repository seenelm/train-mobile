import Form from "../../../components/form";
import { FormProps } from "../types/accessType";

const SignUpForm: React.FC<FormProps> = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => (
    <Form
      title="Sign Up"
      description="Please enter your details to sign up."
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
        {
          placeholder: "Confirm Password",
          value: confirmPassword || "",
          onChangeText: setConfirmPassword || (() => {}),
          secureTextEntry: true,
        },
      ]}
      containerStyle={{ width: "80%" }}
    />
  );

  export default SignUpForm;