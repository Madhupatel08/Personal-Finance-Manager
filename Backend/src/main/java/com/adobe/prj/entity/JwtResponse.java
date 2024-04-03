package com.adobe.prj.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@Builder
@ToString
public class JwtResponse {
    private final String jwtToken;
    private final String userId;
}
