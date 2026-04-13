import { ContainerAnimated,
    ContainerInset,
    ContainerScroll,
    ContainerSticky,
    HeroButton,
    HeroVideo } from "@/components/ui/animated-video-on-scroll"
  
    export const HeroVideoDemo = () => {
    return (
      <section>
        <ContainerScroll className="h-[350vh]">
          <ContainerSticky
            
            className="bg-[#1c1c1c] px-6 py-10 text-slate-50"
          >
            
  
            <ContainerInset className="max-h-[100vh] w-full py-0">
              <HeroVideo
                src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
                data-src="https://videos.pexels.com/video-files/8566672/8566672-uhd_2560_1440_30fps.mp4"
              />
            </ContainerInset>
          
          </ContainerSticky>
        </ContainerScroll>
      </section>
    )
  }
  