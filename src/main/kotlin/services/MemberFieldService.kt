package nl.stvlekstreek.portal.services

import community.flock.eco.feature.member.model.Member
import community.flock.eco.feature.member.model.MemberField
import community.flock.eco.feature.member.model.MemberFieldType
import community.flock.eco.feature.member.repositories.MemberFieldRepository
import org.springframework.stereotype.Service
import java.util.*
import javax.annotation.PostConstruct

@Service
class MemberFieldService(
        private val memberFieldRepository: MemberFieldRepository
) {

    enum class MemberFields(val label: String, val type: MemberFieldType, val disabled: Boolean = false, val options: SortedSet<String> = sortedSetOf()) {
        COMPETITION_NUMBER("Competition number", MemberFieldType.TEXT),
        LICENSE_NUMBER("License number", MemberFieldType.TEXT),
        SPEEDSKATING_RESULTS_ID("Speedskating results id", MemberFieldType.TEXT),
    }

    @PostConstruct
    fun init() {
        MemberFields.values()
                .filter { !memberFieldRepository.findByName(it.key()).isPresent }
                .map {
                    MemberField(
                            name = it.key(),
                            label = it.label,
                            type = it.type,
                            disabled = it.disabled,
                            options = it.options
                    )
                }
                .let { memberFieldRepository.saveAll(it) }
    }



}

fun Member.getFieldValue(field: MemberFieldService.MemberFields) = this.fields[field.key()]
fun MemberFieldService.MemberFields.key() = this.name.toLowerCase()
