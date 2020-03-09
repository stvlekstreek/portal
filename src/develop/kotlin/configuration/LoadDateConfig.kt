package nl.stvlekstreek.portal.configuration

import community.flock.eco.feature.member.data.MemberLoadData
import nl.stvlekstreek.portal.data.UserLoadData
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

@Configuration
//@ConditionalOnProperty("flock.fundraising.load-data.enabled")
@Import(
        MemberLoadData::class,
        UserLoadData::class)
class LoadDateConfig
