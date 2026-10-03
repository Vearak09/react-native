# ICT 304 — Session 11 Lab

# Add Animation to a Working Onboarding Screen

## Lab Objective

In this lab, you will **start from a complete working onboarding screen** and improve it with animation.

You are **not designing or building the onboarding UI from scratch**.

The focus is:

```text
Working UI
   ↓
Identify what feels static
   ↓
Add animation
   ↓
Run and observe
   ↓
Tweak values
```

You will add animation to:

1. Page indicators
2. Next button feedback
3. Main illustration
4. Page theme colors

---

# 1. Install Reanimated

From your Expo project, run:

```bash
npx expo install react-native-reanimated
```

If your project does not already have Safe Area Context:

```bash
npx expo install react-native-safe-area-context
```

Then restart Expo:

```bash
npx expo start -c
```

---

# 2. Add the Working Onboarding Screen

Create this file:

```text
app/onboarding.js
```

Paste the following complete code.

> Run this version first before adding any animation.

```jsx
import { router } from "expo-router";
import { useRef, useState } from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const slides = [
  {
    id: "1",
    eyebrow: "PLAN",
    title: "Plan Your Day",
    description:
      "Keep your important tasks organized and know what needs your attention next.",
    symbol: "✓",
    background: "#EFF6FF",
    soft: "#DBEAFE",
    mid: "#BFDBFE",
    accent: "#2563EB",
  },
  {
    id: "2",
    eyebrow: "FOCUS",
    title: "Stay Focused",
    description:
      "See one clear priority at a time and reduce unnecessary distractions.",
    symbol: "◎",
    background: "#FFFBEB",
    soft: "#FEF3C7",
    mid: "#FDE68A",
    accent: "#D97706",
  },
  {
    id: "3",
    eyebrow: "PROGRESS",
    title: "Build Momentum",
    description:
      "Complete small goals, see your progress, and keep moving forward.",
    symbol: "↑",
    background: "#F0FDF4",
    soft: "#DCFCE7",
    mid: "#BBF7D0",
    accent: "#16A34A",
  },
];

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();

  const scrollRef = useRef(null);

  const [currentPage, setCurrentPage] =
    useState(0);

  const isLastPage =
    currentPage === slides.length - 1;

  function goToPage(page) {
    scrollRef.current?.scrollTo({
      x: page * width,
      animated: true,
    });
  }

  function handleNext() {
    if (!isLastPage) {
      goToPage(currentPage + 1);
      return;
    }

    router.replace("/");
  }

  return (
    <SafeAreaView
      style={[
        styles.screen,
        {
          backgroundColor:
            slides[currentPage].background,
        },
      ]}
    >
      <View style={styles.topBar}>
        <Text style={styles.brand}>
          FOCUS
        </Text>

        <Pressable
          onPress={() =>
            goToPage(slides.length - 1)
          }
          hitSlop={12}
        >
          <Text style={styles.skipText}>
            Skip
          </Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const offsetX =
            event.nativeEvent.contentOffset.x;

          const page =
            Math.round(offsetX / width);

          setCurrentPage(page);
        }}
      >
        {slides.map((slide) => (
          <View
            key={slide.id}
            style={[
              styles.slide,
              { width },
            ]}
          >
            <View style={styles.illustration}>
              <View
                style={[
                  styles.illustrationCircle,
                  {
                    backgroundColor:
                      slide.soft,
                    borderColor:
                      slide.mid,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.symbol,
                    {
                      color:
                        slide.accent,
                    },
                  ]}
                >
                  {slide.symbol}
                </Text>
              </View>

              <View
                style={[
                  styles.smallShapeOne,
                  {
                    backgroundColor:
                      slide.mid,
                  },
                ]}
              />

              <View
                style={[
                  styles.smallShapeTwo,
                  {
                    backgroundColor:
                      slide.accent,
                  },
                ]}
              />
            </View>

            <Text
              style={[
                styles.eyebrow,
                {
                  color:
                    slide.accent,
                },
              ]}
            >
              {slide.eyebrow}
            </Text>

            <Text style={styles.title}>
              {slide.title}
            </Text>

            <Text style={styles.description}>
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.indicatorRow}>
          {slides.map((slide, index) => (
            <View
              key={slide.id}
              style={[
                styles.indicator,
                index === currentPage
                  ? styles.indicatorActive
                  : styles.indicatorInactive,
                {
                  backgroundColor:
                    slides[currentPage].accent,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.navigationRow}>
          <Pressable
            onPress={() =>
              goToPage(currentPage - 1)
            }
            disabled={currentPage === 0}
            style={[
              styles.backButton,
              currentPage === 0 &&
                styles.backButtonDisabled,
            ]}
          >
            <Text style={styles.backText}>
              Back
            </Text>
          </Pressable>

          <Pressable
            onPress={handleNext}
            style={[
              styles.nextButton,
              {
                backgroundColor:
                  slides[currentPage].accent,
              },
            ]}
          >
            <Text style={styles.nextButtonText}>
              {isLastPage
                ? "Get Started"
                : "Next"}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.teachingNote}>
          Swipe sideways or use the buttons ·
          Page {currentPage + 1} of {slides.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  topBar: {
    minHeight: 56,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brand: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#0F172A",
  },

  skipText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },

  scrollView: {
    flex: 1,
  },

  slide: {
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  illustration: {
    height: 280,
    alignItems: "center",
    justifyContent: "center",
  },

  illustrationCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  symbol: {
    fontSize: 84,
    fontWeight: "700",
  },

  smallShapeOne: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 14,
    top: 28,
    right: 52,
    transform: [
      {
        rotate: "18deg",
      },
    ],
  },

  smallShapeTwo: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    bottom: 32,
    left: 58,
  },

  eyebrow: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.8,
  },

  title: {
    marginTop: 12,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    textAlign: "center",
    color: "#0F172A",
  },

  description: {
    marginTop: 14,
    fontSize: 17,
    lineHeight: 25,
    textAlign: "center",
    color: "#64748B",
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 18,
  },

  indicatorRow: {
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },

  indicator: {
    height: 8,
    borderRadius: 4,
  },

  indicatorActive: {
    width: 28,
    opacity: 1,
  },

  indicatorInactive: {
    width: 8,
    opacity: 0.35,
  },

  navigationRow: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    minWidth: 84,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonDisabled: {
    opacity: 0.35,
  },

  backText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#475569",
  },

  nextButton: {
    minWidth: 150,
    minHeight: 54,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 27,
  },

  nextButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  teachingNote: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 12,
    color: "#94A3B8",
  },
});
```

---

# 3. Add a Link to Open the Onboarding Screen

On any existing screen in your project, add:

```js
import { router } from "expo-router";
```

Then add a button such as:

```jsx
<Pressable
  onPress={() =>
    router.push("/onboarding")
  }
>
  <Text>
    Open Onboarding
  </Text>
</Pressable>
```

If your root Stack explicitly declares routes, make sure this route exists:

```jsx
<Stack.Screen
  name="onboarding"
  options={{
    headerShown: false,
  }}
/>
```

---

# 4. Run the Static Version First

Before adding animation, test the starter.

You should already be able to:

```text
□ Swipe between 3 pages
□ Use Next
□ Use Back
□ Use Skip
□ See the active page indicator
□ See the button color change per page
□ See the background color change per page
□ Press Get Started on the final page
```

At this point the onboarding works.

But several changes happen **instantly**.

That is what we will improve.

---

# Animation 1 — Page Indicator

## What is the problem?

The active page indicator changes immediately:

```text
• • •
→
• ━━ •
```

We want the width and opacity to transition smoothly.

---

## Step 1 — Update React imports

Find:

```js
import { useRef, useState } from "react";
```

Replace it with:

```js
import {
  useEffect,
  useRef,
  useState,
} from "react";
```

---

## Step 2 — Import Reanimated

Add:

```js
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
```

---

## Step 3 — Add an Animated Indicator Component

Add this **above**:

```js
export default function OnboardingScreen() {
```

```jsx
function PageIndicator({
  index,
  currentPage,
  accent,
}) {
  const isActive =
    index === currentPage;

  const width =
    useSharedValue(
      isActive ? 28 : 8
    );

  const opacity =
    useSharedValue(
      isActive ? 1 : 0.35
    );

  useEffect(() => {
    width.value =
      withTiming(
        isActive ? 28 : 8,
        { duration: 220 }
      );

    opacity.value =
      withTiming(
        isActive ? 1 : 0.35,
        { duration: 220 }
      );
  }, [isActive]);

  const animatedStyle =
    useAnimatedStyle(() => ({
      width: width.value,
      opacity: opacity.value,
    }));

  return (
    <Animated.View
      style={[
        styles.indicator,
        animatedStyle,
        {
          backgroundColor: accent,
        },
      ]}
    />
  );
}
```

---

## Step 4 — Replace the Static Indicator

Find:

```jsx
{slides.map((slide, index) => (
  <View
    key={slide.id}
    style={[
      styles.indicator,
      index === currentPage
        ? styles.indicatorActive
        : styles.indicatorInactive,
      {
        backgroundColor:
          slides[currentPage].accent,
      },
    ]}
  />
))}
```

Replace it with:

```jsx
{slides.map((slide, index) => (
  <PageIndicator
    key={slide.id}
    index={index}
    currentPage={currentPage}
    accent={
      slides[currentPage].accent
    }
  />
))}
```

You can now remove:

```js
indicatorActive
indicatorInactive
```

from the stylesheet.

Keep:

```js
indicator: {
  height: 8,
  borderRadius: 4,
},
```

---

## Run

Move between pages.

You should see:

```text
width: 8 → 28
opacity: 0.35 → 1
```

using:

```js
withTiming()
```

---

## Tweak

Try:

```js
28 → 40
```

and:

```js
duration: 220 → 800
```

Answer:

```text
Which value feels clearer?
Which duration feels too slow?
```

---

# Animation 2 — Next Button Feedback

## What is the problem?

The Next button works, but there is little feedback while the finger is pressing it.

We will animate:

```text
press in
1.0 → 0.96

release
0.96 → 1.0
```

---

## Step 1 — Import `withSpring`

Add:

```js
withSpring,
```

to the Reanimated import.

---

## Step 2 — Add a Shared Value

Inside `OnboardingScreen`, add:

```js
const buttonScale =
  useSharedValue(1);
```

---

## Step 3 — Add the Animated Style

Before `return`, add:

```js
const buttonStyle =
  useAnimatedStyle(() => ({
    transform: [
      {
        scale:
          buttonScale.value,
      },
    ],
  }));
```

---

## Step 4 — Replace the Next Button

Find:

```jsx
<Pressable
  onPress={handleNext}
  style={[
    styles.nextButton,
    {
      backgroundColor:
        slides[currentPage].accent,
    },
  ]}
>
  <Text style={styles.nextButtonText}>
    {isLastPage
      ? "Get Started"
      : "Next"}
  </Text>
</Pressable>
```

Replace it with:

```jsx
<Pressable
  onPress={handleNext}

  onPressIn={() => {
    buttonScale.value =
      withTiming(
        0.96,
        { duration: 100 }
      );
  }}

  onPressOut={() => {
    buttonScale.value =
      withSpring(1);
  }}
>
  <Animated.View
    style={[
      styles.nextButton,
      buttonStyle,
      {
        backgroundColor:
          slides[currentPage].accent,
      },
    ]}
  >
    <Text style={styles.nextButtonText}>
      {isLastPage
        ? "Get Started"
        : "Next"}
    </Text>
  </Animated.View>
</Pressable>
```

---

## Run

Press and hold Next, then release.

You should feel:

```text
Timing
→ quick press-down

Spring
→ natural return
```

---

## Tweak

Try:

```js
0.96 → 0.85
```

Then replace:

```js
withSpring(1)
```

with:

```js
withTiming(
  1,
  { duration: 150 }
)
```

Compare the two.

---

# Animation 3 — Main Illustration

## What is the problem?

The main illustration is important, but completely static.

We will add a subtle repeating scale animation.

---

## Step 1 — Import `withRepeat`

Add:

```js
withRepeat,
```

to the Reanimated import.

---

## Step 2 — Add a Shared Value

Inside `OnboardingScreen`, add:

```js
const iconScale =
  useSharedValue(1);
```

---

## Step 3 — Start the Animation

Before `return`, add:

```js
useEffect(() => {
  iconScale.value =
    withRepeat(
      withTiming(
        1.1,
        { duration: 1400 }
      ),
      -1,
      true
    );
}, []);
```

---

## Step 4 — Create the Animated Style

Add:

```js
const iconStyle =
  useAnimatedStyle(() => ({
    transform: [
      {
        scale:
          iconScale.value,
      },
    ],
  }));
```

---

## Step 5 — Change the Symbol Component

Find:

```jsx
<Text
  style={[
    styles.symbol,
    {
      color:
        slide.accent,
    },
  ]}
>
  {slide.symbol}
</Text>
```

Replace it with:

```jsx
<Animated.Text
  style={[
    styles.symbol,
    iconStyle,
    {
      color:
        slide.accent,
    },
  ]}
>
  {slide.symbol}
</Animated.Text>
```

---

## Run

The symbol should now repeat:

```text
1.0 → 1.1 → 1.0
```

---

## Tweak

Try:

```js
1.1 → 1.3
```

and:

```js
1400 → 400
```

Ask yourself:

```text
When does animation become distracting?
```

---

# Animation 4 — Page Theme Transition

## What is the problem?

The page itself scrolls smoothly, but the background and accent colors still change instantly.

We will animate those colors.

---

## Step 1 — Import `interpolateColor`

Add:

```js
interpolateColor,
```

to the Reanimated import.

---

## Step 2 — Prepare the Color Values

Immediately after:

```js
const slides = [
  ...
];
```

add:

```js
const pageNumbers =
  slides.map(
    (slide, index) => index
  );

const accentColors =
  slides.map(
    (slide) => slide.accent
  );

const backgroundColors =
  slides.map(
    (slide) =>
      slide.background
  );
```

---

## Step 3 — Add `colorProgress`

Inside `OnboardingScreen`, add:

```js
const colorProgress =
  useSharedValue(0);
```

---

## Step 4 — Animate It When the Page Changes

Before `return`, add:

```js
useEffect(() => {
  colorProgress.value =
    withTiming(
      currentPage,
      { duration: 300 }
    );
}, [currentPage]);
```

---

## Step 5 — Create the Animated Background Style

Add:

```js
const backgroundStyle =
  useAnimatedStyle(() => ({
    backgroundColor:
      interpolateColor(
        colorProgress.value,
        pageNumbers,
        backgroundColors
      ),
  }));
```

---

## Step 6 — Create the Animated Accent Style

Add:

```js
const accentStyle =
  useAnimatedStyle(() => ({
    backgroundColor:
      interpolateColor(
        colorProgress.value,
        pageNumbers,
        accentColors
      ),
  }));
```

---

## Step 7 — Animate the Screen Background

Find the opening:

```jsx
<SafeAreaView
  style={[
    styles.screen,
    {
      backgroundColor:
        slides[currentPage].background,
    },
  ]}
>
```

Replace it with:

```jsx
<Animated.View
  style={[
    styles.screen,
    backgroundStyle,
  ]}
>
  <SafeAreaView
    style={styles.safeArea}
    edges={["top", "bottom"]}
  >
```

At the bottom of the return block, replace the final:

```jsx
</SafeAreaView>
```

with:

```jsx
  </SafeAreaView>
</Animated.View>
```

Add:

```js
safeArea: {
  flex: 1,
},
```

to the stylesheet.

---

## Step 8 — Animate the Button Accent Color

In the button's animated style array, replace:

```js
{
  backgroundColor:
    slides[currentPage].accent,
},
```

with:

```js
accentStyle,
```

So it becomes:

```jsx
<Animated.View
  style={[
    styles.nextButton,
    buttonStyle,
    accentStyle,
  ]}
>
```

---

## Step 9 — Animate the Indicator Accent Color

Change the `PageIndicator` props from:

```js
function PageIndicator({
  index,
  currentPage,
  accent,
}) {
```

to:

```js
function PageIndicator({
  index,
  currentPage,
  accentStyle,
}) {
```

Then replace:

```js
{
  backgroundColor: accent,
},
```

with:

```js
accentStyle,
```

Finally, update the component call:

```jsx
<PageIndicator
  key={slide.id}
  index={index}
  currentPage={currentPage}
  accentStyle={accentStyle}
/>
```

---

## Run

Move between pages.

You should now see:

```text
blue → orange → green
```

transition gradually.

---

## Tweak

Try:

```js
duration: 300
```

then:

```js
duration: 1200
```

Answer:

```text
Which duration matches the page movement better?
```

---

# Final Check

Your onboarding should still behave exactly like the original static version.

Only the feedback has improved.

```text
□ Swipe works
□ Back works
□ Next works
□ Skip works
□ Get Started works

□ Page indicator animates
□ Button responds to press
□ Illustration animates
□ Background color transitions
□ Accent color transitions
```

---

# Final Reflection

Choose one animation and explain:

```text
What was static before?
______________________________________

What shared value changes?
______________________________________

What property changes visually?
______________________________________

Which function controls the animation?
______________________________________

Why does this improve the interaction?
______________________________________
______________________________________
```

---

# Key Idea

The onboarding screen was already working.

The purpose of this lab is to learn how animation improves an existing interface:

```text
Working UI
   ↓
Find an abrupt change
   ↓
Choose a value to animate
   ↓
Choose timing / spring / repeat / interpolation
   ↓
Compare the experience
```

> Animation should support interaction feedback and communicate change — not replace good UI structure.
