package nl.stvlekstreek.portal.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tasks")
class TasksController() {

    @GetMapping("/run")
    fun transactions() {
        println("Run task")
    }

}
