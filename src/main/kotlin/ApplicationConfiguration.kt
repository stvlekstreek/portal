package nl.stvlekstreek.portal

import community.flock.eco.feature.member.MemberConfiguration
import community.flock.eco.feature.user.UserConfiguration
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@Configuration
@EnableJpaRepositories
@EntityScan
@ComponentScan(basePackages = [
    "nl.stvlekstreek.portal.services",
    "nl.stvlekstreek.portal.controllers"
])
@Import(UserConfiguration::class,
        MemberConfiguration::class)
class ApplicationConfiguration
