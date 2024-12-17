import type { Meta, StoryObj } from '@storybook/react';
import { ThemedText } from '../components/ThemedText';
import { View } from 'react-native';

const meta = {
  decorators: [
    (Story) => (
      <View style={{ padding: 12}}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </View>
    ),
  ],
  title: "ThemedText",
  component: ThemedText,
  args: {
    children: "Test"
  }
} satisfies Meta<typeof ThemedText>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {};
export const Title: Story = { args: { type: "title" } }
export const DefaultSemiBold: Story = { args: { type: "defaultSemiBold" } }
export const Link: Story = { args: { type: "link" } }
export const Subtitle: Story = { args: { type: "subtitle" } }

