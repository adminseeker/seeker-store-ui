package com.adminseeker.apis.bo;

import java.util.List;

import lombok.Data;

@Data
public class UserProfile {
    private String userId;
    private String name;
    private String email;
    private String phone;
    private String role;
    private List<Address> addressList;
    private String msg;
    private Integer statusCode;

    @Data
    static class Address {
        private String addressId;
        private String nickname;
        private String phone;
        private String country;
        private String state;
        private String city;
        private String street;
        private String postalCode;

    }
}
