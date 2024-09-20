/* eslint-disable react/prop-types */
import { Box, Button, Container, IconButton, Input, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyboardArrowLeft, Visibility, VisibilityOff } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import CButton from '../../common/CButton';

const SignIn = (props) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [forgotePassSecOpen, setForgotePassSecOpen] = useState(false);
  const [payload, setPayload] = useState({ email: 'demo000@mail.com', password: 'haud7236te2e' })
  const [payloadError, setPayloadError] = useState({ email: "", password: "" });
  const [emailNotReceivedSecOpen, setEmailNotReceivedSecOpen] = useState(false)
  const [disableResendBtn, setDisableResendBtn] = useState(false);
  const [forgotEmail, setForgotEmail] = useState({ email: '' });
  const [promotions, setPromotions] = useState([])


  // const { loading: promotionLoading, error: promotionErr } = useQuery(PROMOTIONS, {
  //   onCompleted: (res) => {
  //     setPromotions(res.promotions.edges)
  //   }
  // })



  // const [loginUser, { loading, error: loginErr }] = useMutation(LOGIN_USER, {
  //   onCompleted: (res) => {
  //     const userRole = res.loginUser.user.role;
  //     if (userRole !== "company-owner" && userRole !== "company-employee" && userRole !== "company-manager") {
  //       toast.error('Access Denied');
  //       return;
  //     }
  //     localStorage.setItem("lunsjavtale", res.loginUser.access);
  //     toast.success('Login Success!');
  //     window.location.href = "/dashboard";
  //   },
  //   onError: (err) => {
  //     if (err.graphQLErrors && err.graphQLErrors.length > 0) {
  //       const errorCode = err.graphQLErrors[0].extensions.code;
  //       const errorMessage = err.graphQLErrors[0].extensions.message;
  //       toast.error(errorMessage)
  //       if (errorCode === 'email_not_verified') {
  //         setEmailNotReceivedSecOpen(true)
  //       }
  //     }
  //   },
  // });


  //google login
  // const [googleLogin, { GoogleLoginloading, }] = useMutation(SOCIAL_LOGIN, {
  //   onCompleted: (res) => {
  //     localStorage.setItem("lunsjavtale", res.socialLogin.access);
  //     toast.success('Login Success!');
  //     window.location.href = "/dashboard";
  //   },
  //   onError: (err) => {
  //     toast.error(err.message)
  //   },
  // });


  // const googleLoginHandler = (res) => {
  //   try {
  //     const decodedToken = jwtDecode(res.credential);
  //     googleLogin({
  //       variables: {
  //         email: decodedToken.email,
  //         socialId: decodedToken.sub
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error decoding token or during login:', error);
  //     toast.error('Failed to login with Google');
  //   }
  // };

  const handleInputChange = (e) => {
    setPayloadError({ ...payloadError, [e.target.name]: '' });
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  // const handleLogin = () => {
  //   if (!payload.email) {
  //     setPayloadError({ ...payloadError, email: 'Please enter email!' });
  //     return;
  //   }
  //   if (!payload.password) {
  //     setPayloadError({ ...payloadError, password: 'Please enter password!' })
  //     return;
  //   }
  //   if (loginErr) toast.error('SomeThing went wrong!')
  //   loginUser({ variables: payload })
  // }

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleLogin()
  //   }
  // }



  // const [resendMail] = useMutation(SEND_VERIFICATION_MAIL, {
  //   onCompleted: (res) => {
  //     const { message, success } = res.sendVerificationMail;
  //     toast.success(message)
  //   },
  //   onError: (res) => {
  //     toast.error(res.message)
  //   }
  // });

  // const handleResendMail = () => {
  //   resendMail({
  //     variables: {
  //       email: payload.email
  //     }
  //   })
  //   setDisableResendBtn(true)
  //   setTimeout(() => {
  //     setDisableResendBtn(false)
  //   }, 50000);
  // };



  // const [passwordReset, { loading: passResetLoading, data: passResetData }] = useMutation(PASSWORD_RESET, {
  //   onCompleted: (res) => {
  //     // toast.success(res.passwordResetMail.message)
  //     setForgotEmail({ email: '' })
  //   },
  //   onError: (err) => {
  //     toast.error(err.message)
  //   }
  // });

  // const handleForgotePassword = () => {
  //   if (!forgotEmail.email) {
  //     toast.error('Please enter your email!')
  //     return;
  //   }
  //   passwordReset({
  //     variables: {
  //       email: forgotEmail.email
  //     }
  //   })
  // }

  const passResetData = ''

  const passwordVisibilityHandler = () => setPasswordVisibility(!passwordVisibility);


  return (
    <Container sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      py: { xs: 5, lg: 0 },
      background: 'linear-gradient(90deg, #EDF3FF 0%, #FFE8D7 100%, #F0FFDF 100%)',
    }} maxWidth='xxl'>
      <Stack alignItems='center' sx={{ width: { xs: '100%', md: '50%' } }}>
        {
          forgotePassSecOpen ? (
            <Stack sx={{
              width: { xs: '100%', md: '480px' },
              justifyContent: 'center',
            }}>
              <Stack sx={{ width: '100%' }} direction='row' alignItems='center' justifyContent={'space-between'}>

                <Button onClick={() => setForgotePassSecOpen(false)} sx={{
                  color: 'gray',
                  mb: 2,
                }} startIcon={<KeyboardArrowLeft />}>Back</Button>
              </Stack>
              {
                passResetData ?
                  <Typography sx={{
                    bgcolor: 'light.main',
                    borderRadius: '8px',
                    px: 2, py: 1, color: 'primary.main'
                  }}>{passResetData.passwordResetMail.message}</Typography> :
                  <Stack>
                    <Typography sx={{ fontWeight: 600, fontSize: '25px', mb: 3 }}>Forgote Password?</Typography>
                    <Input value={forgotEmail.email} sx={{ mb: 2 }} placeholder='Enter Your Email' onChange={(e) => setForgotEmail({ email: e.target.value })} type="text" />
                    {/* <TextField onChange={(e)=> setForgotEmail(e.target.value)} sx={{ mb: 2 }} fullWidth placeholder='email address' variant="outlined" /> */}
                    <Button
                      // isLoading={passResetLoading} 
                      // disable={passResetLoading} 
                      // onClick={handleForgotePassword}
                      variant='contained'
                    >Send
                    </Button>
                  </Stack>
              }
            </Stack>

          ) : (
            <Stack sx={{
              width: { xs: '100%', md: '480px' },
              justifyContent: 'center',
            }}>
              <Box sx={{
                mb: 2
              }}>
                <Typography sx={{ fontSize: '35px', color: 'primary.main', fontWeight: 600, textAlign: 'center' }}>Edu-Quest</Typography>
                {/* <img width='100%' src="logo.svg" alt="" /> */}
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: '25px', mb: 3, textAlign: 'center' }}>Sign in</Typography>
              <TextField
                onChange={handleInputChange}
                name='email'
                value={payload.email}
                error={payloadError.email !== ''}
                helperText={payloadError && payloadError.email}
                sx={{ mb: 2 }}
                fullWidth
                label="Email"
                variant="standard"
              // onKeyDown={handleKeyPress}
              />
              <TextField
                sx={{ mb: 1 }}
                variant="standard"
                type={passwordVisibility ? "text" : "password"}
                name="password"
                label="Password"
                fullWidth
                value={payload.password}
                error={payloadError.password !== ""}
                helperText={payloadError && payloadError.password}
                onChange={handleInputChange}
                // onKeyDown={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={passwordVisibilityHandler}
                        onMouseDown={passwordVisibilityHandler}
                        edge="end"
                      >
                        {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography onClick={() => setForgotePassSecOpen(true)} sx={{ fontSize: '15px', mb: 4, mt: 1, color: 'primary.main ', cursor: 'pointer' }}>Forgote Password?</Typography>
              <Link to='/dashboard'>
                <Button style={{ mb: 2, width: '100%' }}
                  //  onClick={handleLogin}
                  //  isLoading={loading} 
                  variant='contained'
                >
                  Sign In
                </Button>
              </Link>

            </Stack>
          )
        }
      </Stack>
    </Container>

  )
}

export default SignIn