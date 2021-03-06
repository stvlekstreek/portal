package nl.stvlekstreek.portal.configuration

import community.flock.eco.feature.user.services.UserAuthorityService
import community.flock.eco.feature.user.services.UserSecurityService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

    @Autowired
    lateinit var environment: Environment

    @Autowired
    lateinit var userAuthorityService: UserAuthorityService


    @Autowired
    lateinit var userSecurityService: UserSecurityService

    override fun configure(http: HttpSecurity) {

        http
                .headers().frameOptions().sameOrigin()
        http
                .csrf().disable()
        http
                .authorizeRequests()
                .antMatchers("/index.html").permitAll()
                .antMatchers("/main.*.js").permitAll()
                .antMatchers("/donataion.js").permitAll()
                .antMatchers("/donataion.html").permitAll()

                .antMatchers("/configuration").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/login/**").permitAll()
                .antMatchers("/_ah/**").permitAll()

                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/actuator/**").permitAll()

                .antMatchers(HttpMethod.GET, "/tasks/**").permitAll()
                .anyRequest().authenticated()

        http
                .cors()

        if (environment.activeProfiles.contains("local"))
            userSecurityService.testLogin(http)
        else
            userSecurityService.googleLogin(http)
    }


}

