const SignUpStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: 3,
    backgroundColor: "#e3f2fd",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    gap: 2,
  },
  signUpButton: {
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  },
  loginText: {
    marginTop: 2,
    textAlign: "center",
    cursor: "pointer",
    color: "#1976d2",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

export default SignUpStyles;
