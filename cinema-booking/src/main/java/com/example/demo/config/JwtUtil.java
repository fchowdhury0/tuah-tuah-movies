package com.example.demo.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtUtil {
    private final String AUTH_SECRET_KEY = "CgAhZlkkYFaDWKgqGvNZT5hs9YXAp4vk3Q7DhqgTeVI=";
    private final String ACTIVATION_SECRET_KEY = "ThisIsASecretKeyForActivationTokens"; // Use a secure key

    // Generate JWT token for user authentication
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username, AUTH_SECRET_KEY, 1000 * 60 * 60 * 10); // 10-hour expiration
    }

    // Generate activation token for account activation
    public String generateActivationToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("type", "activation");
        return createToken(claims, user.getUsername(), ACTIVATION_SECRET_KEY, 1000 * 60 * 60 * 24); // 24-hour expiration
    }

    public String generateTokenWithRole(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role.toLowerCase()); // ensure lowercase
        return createToken(claims, username, AUTH_SECRET_KEY, 1000 * 60 * 60 * 10); // 10-hour expiration
    }

    private String createToken(Map<String, Object> claims, String subject, String secretKey, long expirationTime) {
        return Jwts.builder()
                   .setClaims(claims)
                   .setSubject(subject)
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                   .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                   .compact();
    }

    // Extract username from the activation token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject, AUTH_SECRET_KEY);
    }

    // Extract a specific claim from token using a secret key
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver, String secretKey) {
        final Claims claims = extractAllClaims(token, secretKey);
        return claimsResolver.apply(claims);
    }

    // Extract all claims from the token using a secret key
    private Claims extractAllClaims(String token, String secretKey) {
        return Jwts.parserBuilder()
                   .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    // Check if the token has expired
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date from the token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration, AUTH_SECRET_KEY);
    }

    // Validate activation token
    public Boolean validateActivationToken(String token, User user) {
        final String username = extractUsername(token);
        return (username.equals(user.getUsername()) && !isTokenExpired(token, ACTIVATION_SECRET_KEY));
    }

    // Validate JWT token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Check if token is expired using secret key
    private Boolean isTokenExpired(String token, String secretKey) {
        return extractExpiration(token, secretKey).before(new Date());
    }

    // Extract expiration date from token using secret key
    public Date extractExpiration(String token, String secretKey) {
        return extractClaim(token, Claims::getExpiration, secretKey);
    }
}