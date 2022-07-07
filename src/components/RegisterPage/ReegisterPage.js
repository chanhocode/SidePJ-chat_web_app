import React, { useRef, useState } from "react";
import { Link, Route } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import md5 from "md5";

function ReegisterPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  // password 와 confirm이 같은지 확인 하기 위해
  const password = useRef();
  password.current = watch("password");
  // firebase를 이용해서 유저생성
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const auth = getAuth();
      let createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(auth.currentUser, {
        displayNane: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      });

      // firebase 데이터 저장
      set(ref(getDatabase(), `users/${createdUser.user.uid}`), {
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      })

      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div className="RegisterPage">
      <div style={{ textAlign: "center" }}>
        <h3>RegisterPage</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: Route, pattern: /^\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}

        <label>Name</label>
        <input
          name="name"
          {...register("name", { required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === "required" && (
          <p>This name field is required</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>Your input exceed maximum length</p>
        )}

        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>This password field is required</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>Password must have at least 6 chareacters</p>
        )}

        <label>Confirm Password</label>
        <input
          name="confirmpassword"
          type="password"
          {...register("confirmpassword", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.Confirmpassword &&
          errors.Confirmpassword.type === "required" && (
            <p>This password confirm field is required</p>
          )}
        {errors.Confirmpassword &&
          errors.Confirmpassword.type === "validate" && (
            <p>The passwords do not match</p>
          )}
        {errorFromSubmit && <p>{errorFromSubmit}</p>}

        <input type="submit" value="submit" disabled={loading} />
        <Link style={{ color: "gray", textDecoration: "none" }} to="/login">
          {" "}
          Already have an account? . . .{" "}
        </Link>
      </form>
    </div>
  );
}

export default ReegisterPage;
