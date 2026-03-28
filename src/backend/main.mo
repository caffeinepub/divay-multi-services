import Map "mo:core/Map";
import Principal "mo:core/Principal";

import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  // Kept for upgrade compatibility - these were stable variables in the previous version
  type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    referralCode : Text;
    uplineCode : ?Text;
    packageTier : { #none; #black; #blue; #white };
    joinDate : Text;
    status : { #active; #pending; #inactive };
    directReferrals : Nat;
    teamSize : Nat;
    roiBalance : Nat;
    commissionBalance : Nat;
    totalWithdrawn : Nat;
    bankAccount : ?{ accountNumber : Text; bankName : Text; ifsc : Text };
  };

  type Investment = {
    id : Text;
    userId : Principal;
    userName : Text;
    tier : { #black; #blue; #white };
    amount : Nat;
    date : Text;
    status : { #pending; #active; #rejected };
    certificateId : Text;
  };

  type Transaction = {
    id : Text;
    userId : Principal;
    txType : { #roi; #commission; #withdrawal };
    amount : Nat;
    date : Text;
    description : Text;
    status : { #credited; #pending; #approved; #rejected };
  };

  type Withdrawal = {
    id : Text;
    userId : Principal;
    userName : Text;
    amount : Nat;
    date : Text;
    status : { #pending; #approved; #rejected };
    withdrawalType : { #roi; #commission };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let usersByEmail = Map.empty<Text, Principal>();
  let usersByReferralCode = Map.empty<Text, Principal>();
  let investments = Map.empty<Text, Investment>();
  let transactions = Map.empty<Text, Transaction>();
  let withdrawals = Map.empty<Text, Withdrawal>();
  let referralTree = Map.empty<Text, [Principal]>();

  var investmentCounter : Nat = 0;
  var transactionCounter : Nat = 0;
  var withdrawalCounter : Nat = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
};
