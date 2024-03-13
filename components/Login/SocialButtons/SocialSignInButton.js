import React, {useEffect, useState} from 'react';
import {Platform, View, Linking} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import {auth0Client, auth0Domain, auth0Audience, auth0GoogleAudience, auth0ClonedGoogleAudience, auth0ClonedGoogleClient, auth0ClonedDomain} from '../../../src/constants';
import {useNavigation} from '@react-navigation/native';
import auth0 from '../auth0';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { authorize } from 'react-native-app-auth';
import {
  GOOGLE_CLIENT_IOS_ID,
  GOOGLE_CLIENT_WEB_ID,
} from '../../../src/constants';
import { useUser } from '../../../context/UserContext';
import { useUserId } from '../../../context/UserIdContext';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const SocialSignInButton = () => {
  const [loggedInUser, setloggedInUser] = useState(null);
  const navigation = useNavigation();
  const { authorize, clearSession, user, getCredentials, error, isLoading } = useAuth0(); // Using useAuth0 hook
  const { userEmail, setUserEmail } = useUser();
  const { userId, setUserId } = useUserId();
  const redirectUri = 'com.aialphamobileapp://dev-zoejuo0jssw5jiid.us.auth0.com/ios/com.aialphamobileapp/login/callback';
  const apiUrl = 'https://dev-zoejuo0jssw5jiid.us.auth0.com/api/v2/users';


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_WEB_ID,
      iosClientId: GOOGLE_CLIENT_IOS_ID,
      offlineAccess: true,
    });
  }, []);
  const signInWithGoogle = async () => {
    try {
      
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);

      // Extract necessary user data
      const { idToken, user } = userInfo;
      const authorizationCode = userInfo.serverAuthCode; // Capture authorization code
      console.log("idtoken: ", idToken);
      console.log("authorizationCode: ", authorizationCode);

      // Send user data to Auth0
      const payload = {
        grant_type: 'authorization_code',
        id_token: idToken,
        code: userInfo.serverAuthCode, // Include authorization code in the payload
        audience: auth0ClonedGoogleAudience,
        client_id: auth0ClonedGoogleClient,
        scope: 'openid profile email',
        connection: 'google-oauth2',
        redirect_uri: redirectUri,
      };

      console.log("payload: ", payload);
      console.log("sending payload to auth0")
      // Make request to Auth0
      const auth0Response = await axios.post(
        `https://${auth0ClonedDomain}/oauth/token`,
        payload,
      );

      



      console.log('Auth0 Response:', auth0Response);

      const userId = auth0Response.data.user_id;
      navigation.navigate('HomeScreen');

      // Update state or context with user ID
      setUserId(userId);

      return {
        message: 'success',
        ...auth0Response.data,
      };
      /*
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserId(userInfo);
      const isSigned = await GoogleSignin.isSignedIn();
      if (isSigned) {
        console.log('Signed In correctly: ', isSigned);
        navigation.navigate('HomeScreen');
      } else {
        console.error('Fail to sign in');
      }*/
  } catch (error) {
    // Handle errors
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.warn('User cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.warn('Operation is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.warn('Play services not available or outdated');
    } else {
      console.error('Some other error happened', error);
      // Log the error response if available
      if (error.response) {
        console.error('Auth0 Error Response:', error.response.data);
      }
    }
  }
};



  

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        nonceEnabled: false,
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      console.log('Apple Auth Response:', appleAuthRequestResponse);
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      const {fullName, email, authorizationCode, user} =
        appleAuthRequestResponse;
      console.log('User !Email:', email);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const {fullName, email, authorizationCode, user} =
          appleAuthRequestResponse;
        const {familyName, givenName} = fullName || {};
        console.log('User Data:', user);
        console.log('Full Name:', fullName);
        console.log('User Email:', user?.email);
        console.log('User2 Email:', email);
        const payload = {
          grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
          subject_token_type:
            'http://auth0.com/oauth/token-type/apple-authz-code',
          scope: 'read:appointments openid profile email email_verified',
          audience: auth0Audience,
          subject_token: authorizationCode,
          client_id: auth0Client,
          user_profile: JSON.stringify({
            name: {
              firstName: givenName,
              lastName: familyName,
            },
            email,
          }),
        };
        console.log('Auth0 Request Payload:', payload);
        const auth0Response = await axios.post(
          `https://${auth0Domain}/oauth/token`,
          payload,
        );
        console.log('Auth0 Response:', auth0Response.data);
        console.log("User id is: ", user);
        let newUser = "apple|" + user;
        console.log("New User id is: ", newUser);
        navigation.navigate('HomeScreen');
        setUserId(newUser);
        //setUserEmail(email);
        console.log("auth0Response.data._id", auth0Response.data._id);
        console.log("email!: ", email);
        console.log('After navigation');
        return {
          message: 'success',
          ...auth0Response.data,
          first_name: givenName,
          last_name: familyName,
        };
      } else {
        throw new Error('Apple Sign-In not authorized');
      }
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      throw error;
    }
  };


  return (
    <Auth0Provider
      domain={'dev-zoejuo0jssw5jiid.us.auth0.com'}
      clientId={'K5bEigOfEtz4Devpc7kiZSYzzemPLIlg'}>
      <View>
        <CustomButton
          text="Continue with Apple"
          onPress={() => signInWithApple()}
          type="APPLE"
          disabled={loggedInUser !== null}
        />

        <CustomButton
          text="Continue with Google"
          onPress={() => signInWithGoogle()}
          type="GOOGLE"
          disabled={loggedInUser !== null}
        /> 

    

      </View>
    </Auth0Provider>
  );
};
export default SocialSignInButton;
