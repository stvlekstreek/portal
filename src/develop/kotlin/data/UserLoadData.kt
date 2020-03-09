package nl.stvlekstreek.portal.data

import community.flock.eco.feature.user.forms.UserAccountPasswordForm
import community.flock.eco.feature.user.forms.UserForm
import community.flock.eco.feature.user.model.User
import community.flock.eco.feature.user.services.UserAccountService
import community.flock.eco.feature.user.services.UserAuthorityService
import community.flock.eco.feature.user.services.UserService
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct

@Component
class UserLoadData(
        private val userService: UserService,
        private val userAccountService: UserAccountService,
        private val userAuthorityService: UserAuthorityService
) {

    val data: MutableMap<String, User> = mutableMapOf()

    @PostConstruct
    fun init() {

        data["test"] = userService.findByEmail("willem.veelenturf@gmail.com")
                ?: userAccountService.createUserAccountPassword(UserAccountPasswordForm(
                        email = "test",
                        password = "test",
                        authorities = userAuthorityService.allAuthorities()
                                .map { it.toName() }
                                .toSet()
                )).user

        data["willem"] = userService.findByEmail("willem.veelenturf@gmail.com")
                ?: userService.create(UserForm(
                        name = "Willem Veelenturf",
                        email = "willem.veelenturf@gmail.com",
                        authorities = userAuthorityService.allAuthorities()
                                .map { it.toName() }
                                .toSet()
                ))

    }

}
