package com.delegrego.api_produtos;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.http.HttpMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import java.util.regex.Pattern;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProdutoIntegrationTests {
    @Autowired MockMvc mvc;
    record Response(int statusCode, String body) {}
    Response request(String method, String path, String body) throws Exception {
        var builder = MockMvcRequestBuilders.request(HttpMethod.valueOf(method), path).contentType("application/json");
        if (body != null) builder.content(body);
        var response = mvc.perform(builder).andReturn().getResponse();
        return new Response(response.getStatus(), response.getContentAsString());
    }
    @Test void completeCrud() throws Exception {
        String body = "{\"nome\":\"Produto teste\",\"descricao\":\"Descricao teste\",\"preco\":12.34,\"urlImagem\":\"https://example.com/test.jpg\"}";
        var created = request("POST", "/produtos", body);
        assertEquals(201, created.statusCode(), created.body());
        var matcher = Pattern.compile("\"id\"\\s*:\\s*(\\d+)").matcher(created.body());
        assertTrue(matcher.find());
        String path = "/produtos/" + matcher.group(1);
        try {
            var list = request("GET", "/produtos", null);
            assertEquals(200, list.statusCode());
            assertTrue(list.body().contains("Descricao teste"));
            var details = request("GET", path, null);
            assertEquals(200, details.statusCode());
            assertTrue(details.body().contains("12.34"));
            assertEquals(200, request("PUT", path, body.replace("12.34", "56.78")).statusCode());
            assertTrue(request("GET", path, null).body().contains("56.78"));
            assertEquals(400, request("POST", "/produtos", body.replace("12.34", "-1")).statusCode());
        } finally {
            assertEquals(204, request("DELETE", path, null).statusCode());
        }
        assertEquals(404, request("GET", path, null).statusCode());
    }
    @Test void corsAllowsOnlyConfiguredOrigin() throws Exception {
        for (String origin : new String[]{"https://strype.example", "https://untrusted.example"}) {
            var response = mvc.perform(MockMvcRequestBuilders.options("/produtos")
                    .header("Origin", origin).header("Access-Control-Request-Method", "PUT")
                    .header("Access-Control-Request-Headers", "content-type")).andReturn().getResponse();
            if (origin.equals("https://strype.example")) {
                assertEquals(200, response.getStatus());
                assertEquals(origin, response.getHeader("access-control-allow-origin"));
            } else {
                assertEquals(403, response.getStatus());
                assertNull(response.getHeader("access-control-allow-origin"));
            }
        }
    }
}
