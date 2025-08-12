import * as Haptics from 'expo-haptics';


const HapticsLight = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
}
const HapticsMedium = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}
const HapticsHeavy = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
}
const HapticsRigid = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
}
const HapticsSoft = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
}

export {
    HapticsHeavy, HapticsLight,
    HapticsMedium, HapticsRigid,
    HapticsSoft
};
