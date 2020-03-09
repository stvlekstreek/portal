package nl.stvlekstreek.portal.controllers

import com.fasterxml.jackson.databind.JsonNode
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.client.WebClient

private fun personalRecordsClient(id: Int) = WebClient
        .create("https://speedskatingresults.com")
        .get()
        .uri("/api/json/personal_records?skater=$id")
        .retrieve()
        .bodyToMono(JsonNode::class.java)

@RestController
@RequestMapping("/test")
class TestController() {

    @GetMapping("/personal_records")
    fun personalRecordsClient() = personalRecordsClient(6198)

}
