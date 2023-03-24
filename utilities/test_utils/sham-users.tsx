import { IdTokenResult, User } from "firebase/auth";

export const simulatedUser: User = {
  uid: "ttf48LgEWDUfNtZc63AwjOL2drU2",
  email: "mark.aaron.fisher@gmail.com",
  emailVerified: false,
  isAnonymous: false,
  providerData: [
    {
      providerId: "password",
      uid: "mark.aaron.fisher@gmail.com",
      displayName: null,
      email: "mark.aaron.fisher@gmail.com",
      phoneNumber: null,
      photoURL: null,
    },
  ],
  metadata: {},
  refreshToken: "",
  tenantId: null,
  delete: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
    throw new Error("Function not implemented.");
  },
  getIdTokenResult: function (
    forceRefresh?: boolean | undefined
  ): Promise<IdTokenResult> {
    throw new Error("Function not implemented.");
  },
  reload: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  toJSON: function (): object {
    throw new Error("Function not implemented.");
  },
  displayName: null,
  phoneNumber: null,
  photoURL: null,
  providerId: "",
};
