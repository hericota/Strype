package com.delegrego.api_produtos.config;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    private final String[] origins;
    public CorsConfig(@Value("${app.cors.allowed-origins}") String origins) {
        this.origins = Arrays.stream(origins.split(",")).map(String::trim)
                .filter(s -> !s.isEmpty()).toArray(String[]::new);
        if (this.origins.length == 0 || Arrays.asList(this.origins).contains("*")) {
            throw new IllegalArgumentException("Configure explicit CORS origins");
        }
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/produtos/**").allowedOrigins(origins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Content-Type", "Authorization")
                .allowCredentials(false).maxAge(3600);
    }
}
